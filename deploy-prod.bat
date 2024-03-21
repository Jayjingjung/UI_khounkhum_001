@echo off

@REM set IMAGE=hubporn.ldblao.la/mobile-division/biz-admin-prod
set IMAGE=khounkham/logistics-web

set VERSION=%1

if defined VERSION GOTO :version_arg_exists

set VERSION=latest

:version_arg_exists

echo Building image: %IMAGE%:%VERSION%

docker build -t %IMAGE%:%VERSION% -f Dockerfile.prod .
docker push %IMAGE%:%VERSION%