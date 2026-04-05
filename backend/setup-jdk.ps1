$ProgressPreference = 'SilentlyContinue'
Write-Host "Downloading Amazon Corretto JDK 17..."
Invoke-WebRequest -Uri "https://corretto.aws/downloads/latest/amazon-corretto-17-x64-windows-jdk.zip" -OutFile "jdk17.zip"
Write-Host "Extracting JDK 17..."
Expand-Archive -Path "jdk17.zip" -DestinationPath "jdk_extracted" -Force
$jdkFolder = Get-ChildItem -Path "jdk_extracted" | Select-Object -First 1
Move-Item -Path $jdkFolder.FullName -Destination "jdk17" -Force
Remove-Item -Path "jdk_extracted" -Recurse -Force
Remove-Item -Path "jdk17.zip" -Force
Write-Host "JDK 17 setup complete!"
