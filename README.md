# DiscordBOT
Make Discrod BOT(RENEWED) - node v13


## UPDATE!!!(2021/12/08)
+ 현재 ytdl-core 사용중인데 stream이 최대 30분까지만 다운로드 되어서 30분 이후에는 Player의 errorhandler를 이용하여 다음 곡으로 넘어가도록 세팅되어있습니다.
+ 위의 과정에서 다음곡으로 넘어갈 때 플레이리스트에 곡이 하나도 존재하지 않으면 connection이 정상적으로 종료되지 않는 문제가 있습니다. 현재 에러메시지가 작동하지만 self-loop형태의
VideoPlayer()메소드 때문에 여러번의 에러메시지가 출력되고 봇의 메시지도 여러번 작동하지만, 끝내 connection이 끊어지고 재사용가능한 상태로 들어가게 됩니다.(..현재 수정중)
+ 그외 사항은 오류가 수정되는대로 readme에 추가할 예정입니다.
