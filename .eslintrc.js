/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Suppress unused vars warnings (no @typescript-eslint plugin installed)
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
