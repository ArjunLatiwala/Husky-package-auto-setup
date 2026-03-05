# Husky-package-auto-setup

> **Zero-config Husky installer.** Just install this package and Husky git hooks are automatically set up in your project — no manual configuration needed.

---

## What it does

When anyone installs this package, the **postinstall** script automatically:

1. Detects the host project root using `INIT_CWD`
2. Runs `git init` if no `.git` directory is found
3. Installs `husky` as a devDependency in the host project
4. Runs `npx husky init` to create the `.husky/` directory
5. Adds `"prepare": "husky"` script to the host `package.json`
6. Creates two ready-to-use default hooks — `pre-commit` and `commit-msg`

---

## Installation

```bash
npm install husky-package-auto-setup
```

That's it. Husky is now configured in your project. ✅

---

## Default hooks created

### `.husky/pre-commit`
Runs before every commit. Replace the `echo` with your actual checks:

```sh
#!/bin/sh
echo "🔍 Running pre-commit checks..."
# npx lint-staged
# npm test
```

### `.husky/commit-msg`
Validates commit messages against the **Conventional Commits** format:

```
<type>(<scope>): <description>
```

**Examples:**
```
feat(auth): add login page
fix: correct typo in README
chore(deps): bump lodash to 4.17.21
```

**Allowed types:** `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`

---

## Customising hooks

Edit the generated files in the `.husky/` directory of your project:

```
your-project/
└── .husky/
    ├── pre-commit     ← edit this
    └── commit-msg     ← edit this
```

### Example: Run lint-staged on pre-commit

```sh
#!/bin/sh
npx lint-staged
```

### Example: Run tests before every commit

```sh
#!/bin/sh
npm test
```

---

## How it works

The magic is in the `postinstall` npm lifecycle hook in `package.json`:

```json
{
  "scripts": {
    "postinstall": "node scripts/install.js"
  }
}
```

npm automatically runs this script after installation. It uses the `INIT_CWD` environment variable (set by npm) to locate the consumer's project root and sets everything up there.

---

## Programmatic API

You can also trigger the setup manually from a script:

```js
const { setup } = require('husky-package-auto-setup');

// Sets up Husky in the current working directory
setup();

// Or pass a specific project path
setup('/absolute/path/to/your/project');
```

---

## Project Structure

```
husky-package-auto-setup/
├── package.json        ← declares postinstall hook
├── index.js            ← optional programmatic API
├── scripts/
│   └── install.js      ← main automation script
└── README.md
```

---

## Compatibility

| Runtime | Version |
|---------|---------|
| Node.js | ≥ 16    |
| npm     | ≥ 7     |
| Husky   | 9.x     |
| Git     | any     |

---

## License

MIT
