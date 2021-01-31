@echo off
cd %~dp0
START startClient.bat
START startEventBus.bat
START startComments.bat
START startPosts.bat
START startModeration.bat
START startQuery.bat
