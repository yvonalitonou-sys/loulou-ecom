const fs = require('fs');
const file = 'C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php';
let content = fs.readFileSync(file, 'utf8');

// Perfectly reverse the PowerShell Get-Content (Win-1252/Latin1) double encoding
const decoded = Buffer.from(content, 'latin1').toString('utf8');

fs.writeFileSync(file, decoded, 'utf8');
console.log('File encoding fully restored');