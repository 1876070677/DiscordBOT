# DiscordBOT
Make Discrod BOT(RENEWED) - node v13


## UPDATE!!!(2021/01/01)
+ ytdl-core에 이슈가 있어서(stream에러 등등) play-dl 모듈을 사용해 다시 시도했습니다. 현재 발견된 에러는 없습니다. 문제는 재귀함수 식으로 다음 곡을 재생하게 되어 있는데, 좀 더 효율적인 방식이 필요한 것 같습니다. 임시 방편으로 조건문에서 다음 곡이 없을경우 바로 종료하도록 처리하였습니다....
+ stopAudio 함수를 따로 만들어서 "정지" 명령어를 받았을 때, 따로 관리하고 있습니다. (방식은 예전과 동일)
