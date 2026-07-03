# MAHEK DECORATOR - Windows Firewall Configuration Script
# Run this as Administrator to enable network access

param(
    [switch]$Remove = $false
)

$rules = @(
    @{
        Name = "MAHEK Decorator - Frontend (Port 3000)"
        Port = "3000"
        Protocol = "tcp"
        Direction = "in"
        Action = "allow"
    },
    @{
        Name = "MAHEK Decorator - Backend API (Port 5000)"
        Port = "5000"
        Protocol = "tcp"
        Direction = "in"
        Action = "allow"
    }
)

function Add-FirewallRule {
    param(
        [string]$Name,
        [string]$Port,
        [string]$Protocol,
        [string]$Direction,
        [string]$Action
    )
    
    try {
        netsh advfirewall firewall add rule `
            name="$Name" `
            dir=$Direction `
            action=$Action `
            protocol=$Protocol `
            localport=$Port `
            enable=yes
        
        Write-Host "✓ Added firewall rule: $Name (Port $Port)" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Error adding rule: $Name" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

function Remove-FirewallRule {
    param(
        [string]$Name
    )
    
    try {
        netsh advfirewall firewall delete rule name="$Name"
        Write-Host "✓ Removed firewall rule: $Name" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Error removing rule: $Name" -ForegroundColor Red
    }
}

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "✗ This script must run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please follow these steps:"
    Write-Host "1. Right-click this script (setup-firewall.ps1)"
    Write-Host "2. Select 'Run with PowerShell'"
    Write-Host "3. If prompted, click 'Run anyway'"
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗"
Write-Host "║   MAHEK DECORATOR - Firewall Configuration Script          ║"
Write-Host "╚════════════════════════════════════════════════════════════╝"
Write-Host ""

if ($Remove) {
    Write-Host "Removing firewall rules..." -ForegroundColor Yellow
    foreach ($rule in $rules) {
        Remove-FirewallRule -Name $rule.Name
    }
    Write-Host ""
    Write-Host "✓ Firewall rules removed successfully!" -ForegroundColor Green
}
else {
    Write-Host "Adding firewall rules for local network access..." -ForegroundColor Yellow
    Write-Host ""
    
    foreach ($rule in $rules) {
        Add-FirewallRule `
            -Name $rule.Name `
            -Port $rule.Port `
            -Protocol $rule.Protocol `
            -Direction $rule.Direction `
            -Action $rule.Action
    }
    
    Write-Host ""
    Write-Host "════════════════════════════════════════════════════════════"
    Write-Host ""
    Write-Host "✓ Firewall configuration complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now access MAHEK DECORATOR from any device on your network:"
    Write-Host ""
    Write-Host "  Local:    http://localhost:3000"
    Write-Host "  Network:  http://10.65.59.11:3000"
    Write-Host ""
    Write-Host "Backend API:"
    Write-Host "  Local:    http://localhost:5000/api"
    Write-Host "  Network:  http://10.65.59.11:5000/api"
    Write-Host ""
}

Write-Host ""
Write-Host "To remove these rules later, run:"
Write-Host "  .\setup-firewall.ps1 -Remove"
Write-Host ""
