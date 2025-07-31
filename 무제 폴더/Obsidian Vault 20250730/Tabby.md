> 운영 서버(kos-was-01) 모니터링
```shell
top -o %MEM
```

> 현행 was 1 모니터링
```shell
cd /home/anbu/log
 s

ll

tail -f 
// -f 입력 이후 띄어쓰기 한 칸 + Tab 버튼으로 log 선택 
```

> 현행 소켓 데몬 프로세스 여부 확인
```shell
ps -ef | grep Socket_Server_new
```

> 화면 스플릿: ~~cmd + shift + D~~ 탭 우클릭 > 분할 > 오른쪽 + 포커스 안된 탭 드래그 이동 배치
> 창 단축기 지정: Preferences > 단축키 > 설정