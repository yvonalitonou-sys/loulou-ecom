# Critical Rule: File Encoding on Windows

When editing files (especially PHP, HTML, TSX) in this project, **NEVER** use PowerShell commands (Get-Content, Set-Content, Out-File, or string replacement via PowerShell) to modify the file content. 

PowerShell on this Windows environment defaults to Windows-1252 encoding and will silently destroy all UTF-8 characters (emojis, French accents), causing double-encoding or irreversible data loss.

**Mandatory Tool Usage:**
- ALWAYS use the native eplace_file_content tool.
- If eplace_file_content cannot be used, use a Node.js script (e.g., s.readFileSync and s.writeFileSync with 'utf8' encoding) to ensure lossless UTF-8 modification.
