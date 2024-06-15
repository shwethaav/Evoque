module.exports = {
    extends: [
      "react-app",
      "react-app/jest"
    ],
    rules: {
    },
    settings: {
      "react-app": {
        ignoreWarningsInCi: true
      }
    },
    overrides: [
      {
        files: ["*.js", "*.jsx"],
        rules: {
          "no-warning-comments": "off" 
        }
      }
    ]
  };