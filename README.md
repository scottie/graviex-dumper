Bot will sell a instrument slighlty under current sell, and if order is replaced it will put a new one up under current sell, and so on..
Untill your bag is sold...

RUN on a unique account made just for this bot.
You can run many accounts/bots on many different markets.
Use a new account/API key for each instance of Bot.
Sells just under current market order

INSTALL:

npm install graviex-dumper --global


  Usage: App [options]

  Options:

    -V, --version           output the version number
    -m, --market <data>     market to run bot on, ie: btc, ltc, eth
    -s, --coin <data>       coin ticker, ie: gio
    -i, --increase <n>      sell increase distance
    -v, --volume <data>     sell volume
    -t, --ticker <data>     market to get ticker for
    -a, --accesskey <data>  Access KEY for API
    -s, --secretkey <data>  Secret KEY for API
    -s, --looptime <n>      time for break in seconds ie: 60
    -h, --help              output usage information


EXAMPLE USAGE:
graviex-dumper --ticker onzbtc
graviex-dumper --market btc --increase 0.000000001 --volume 100 --secretkey 3f5AZ44ViStBpGg6KdqvY8UiE0yvm2Yygdm2xQ6 --accesskey KQxX1dTBSjKbvc5xVoMMUl9THFaXKI2rQ4RwfoE --coin gio --looptime 10

or DUMP ALL coins
graviex-dumper --market btc --increase 0.000000001 --volume ALL --secretkey 3f5AZ44ViStBpGg6KdqvY8UiE0yvm2Yygdm2xQ6 --accesskey KQxX1dTBSjKbvc5xVoMMUl9THFaXKI2rQ4RwfoE --coin gio --looptime 10


