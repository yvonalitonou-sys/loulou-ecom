const { execSync } = require('child_process');
try {
    const result = execSync('findstr /S /I "COMMANDANT" "C:\\Users\\user\\Local Sites\\boutique-cod\\app\\public\\wp-content\\*"', { encoding: 'utf8' });
    console.log(result);
} catch (e) {
    console.log("Not found or error");
}