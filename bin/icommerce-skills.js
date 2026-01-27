#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function printHelp() {
  const text = [
    'icommerce-skills',
    '',
    'Usage:',
    '  icommerce-skills list',
    '  icommerce-skills install [--dest <path>] [--force] [--dry-run]',
    '',
    'Defaults:',
    '  Install target: ~/.claude/skills (override with CLAUDE_HOME or --dest)',
    ''
  ];
  console.log(text.join('\n'));
}

function parseArgs(argv) {
  const args = {
    command: 'install',
    dest: null,
    force: false,
    dryRun: false,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === 'install' || arg === 'list' || arg === 'help') {
      args.command = arg;
      continue;
    }
    if (arg === '--dest') {
      args.dest = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--force') {
      args.force = true;
      continue;
    }
    if (arg === '--dry-run') {
      args.dryRun = true;
      continue;
    }
    if (arg === '-h' || arg === '--help') {
      args.help = true;
      continue;
    }
  }

  return args;
}

function listSkills(skillsDir) {
  return fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function copyDir(src, dest) {
  if (typeof fs.cpSync === 'function') {
    fs.cpSync(src, dest, { recursive: true });
    return;
  }

  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function installSkills(skillsDir, destRoot, opts) {
  const skills = listSkills(skillsDir);
  const installed = [];
  const skipped = [];

  if (!opts.dryRun) {
    fs.mkdirSync(destRoot, { recursive: true });
  }

  for (const skill of skills) {
    const src = path.join(skillsDir, skill);
    const dest = path.join(destRoot, skill);
    const exists = fs.existsSync(dest);

    if (exists && !opts.force) {
      skipped.push(skill);
      continue;
    }

    if (!opts.dryRun && exists && opts.force) {
      fs.rmSync(dest, { recursive: true, force: true });
    }

    if (!opts.dryRun) {
      copyDir(src, dest);
    }

    installed.push(skill);
  }

  return { installed, skipped, total: skills.length };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.command === 'help') {
    printHelp();
    return;
  }

  const repoRoot = path.resolve(__dirname, '..');
  const skillsDir = path.join(repoRoot, 'skills');

  if (!fs.existsSync(skillsDir)) {
    console.error(`Skills directory not found: ${skillsDir}`);
    process.exit(1);
  }

  if (args.command === 'list') {
    listSkills(skillsDir).forEach((name) => console.log(name));
    return;
  }

  const claudeHome = process.env.CLAUDE_HOME || path.join(os.homedir(), '.claude');
  const destRoot = args.dest ? path.resolve(args.dest) : path.join(claudeHome, 'skills');

  const result = installSkills(skillsDir, destRoot, args);

  console.log(`Destination: ${destRoot}`);
  console.log(`Installed: ${result.installed.length}/${result.total}`);
  if (result.installed.length) {
    console.log(`Installed skills: ${result.installed.join(', ')}`);
  }
  if (result.skipped.length) {
    console.log(`Skipped (already present): ${result.skipped.join(', ')}`);
    console.log('Tip: rerun with --force to overwrite.');
  }
}

main();
