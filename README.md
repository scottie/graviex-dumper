//Bot will sell a instrument slighlty under current sell, and if order is replaced it will put a new one up under current sell, and so on..
//Untill your bag is sold...

//RUN on a unique account made just for this bot.
//You can run many accounts/bots on many different markets.
//Use a new account/API key for each instance of Bot.
//Sells just under current market order

/*
  Usage: App [options]

  Options:

    -V, --version        output the version number
    -m, --market <data>  market to run bot on
    -i, --increase <n>   sell increase distance
    -v, --volume <n>     sell volume
    -t, --ticker <data>  market to get ticker for
    -h, --help           output usage information

    EXAMPLE USAGE:

    graviex-dumper --ticker onzbtc
    graviex-dumper --market onzbtc --increase 0.000000001 --volume 100

*/

//-Scott Lindh
//info@merkle.group

Example:
node App.js --market giobtc --increase 0.000000001 --volume 100

Output:
[http://Merkle.Group | Graivex Dumper | info@merkle.group]
Graviex Dumping 100 giobtc...
[Selling]
Selling At: 0.000000300
Orders live are not ours, making new orders...
Removing old orders...
Sell Price: 0.000000299
2078824|wait|sell
Graviex Dumping 100 giobtc...
[Selling]
Selling At: 0.000000299
0.000000299
Orders live are ours, doing nothing...

Order Result:
2078824|wait|sell
OrderID|Status|Direction