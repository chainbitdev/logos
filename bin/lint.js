const glob = require('glob');
const fs = require('fs');

glob('./logos/**/data.json', null, function (er, files) {
  const ERRORS = [];
  files.forEach((file) => {
    const data = fs.readFileSync(file, 'utf8');

    try {
      const parsedData = JSON.parse(data);

      // Ensure the code is uppercase
      if (!(!/[a-z]/.test(parsedData.code) && /[A-Z]/.test(parsedData.code))) {
        ERRORS.push(`Code ${parsedData.code} is not uppercase`);
      }

      // Ensure no white-space in aliases
      if (parsedData.aliases.length >= 1) {
        parsedData.aliases.forEach((alias) => {
          if (/\s/.test(alias)) {
            ERRORS.push(`White space found in ${parsedData.code}`);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

  console.log(`${ERRORS.length} errors found`);
  console.log(ERRORS);
});
