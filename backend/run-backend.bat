@echo off
echo Running Spring Boot with Isolated JDK 17...
set JAVA_HOME=%~dp0jdk17
set PATH=%JAVA_HOME%\bin;%PATH%
mvn spring-boot:run
