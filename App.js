#!/usr/bin/env node
//http://Merkle.Group
//info@merkle.gorup
//-Scott Lindh

//RUN on a unique account made just for this bot.
//You can run many accounts/bots on many different markets.
//Use a new account/API key for each instance of Bot.
// Sells just under current market order

/*
  Usage: App [options]

  Options:

    -V, --version           output the version number
    -m, --market <data>     market to run bot on
    -i, --increase <n>      sell increase distance
    -v, --volume <n>        sell volume
    -t, --ticker <data>     market to get ticker for
    -a, --accesskey <data>  Access KEY for API
    -s, --secretkey <data>  Secret KEY for API
    -h, --help              output usage information

  EXAMPLE USAGE:

    graviex-dumper --ticker onzbtc
    graviex-dumper --market onzbtc --increase 0.000000001 --volume 100 --secretkey 3f5AZ4BViStBpGg6KdqvY8UiE0yvm2Yygdm2xQ66 --accesskey KQxX1dTBSjKbvc5xVoMMUl9THFaXKI2rQ4RwfPoE

*/
// Insure you have enough in your account to cover Bot.

var graviex = require("graviex");
const chalkAnimation = require('chalk-animation');
var program = require('commander');


//var market = "onzbtc"
//var increase = 0.000000001;
//var volume = 100;

program
  .version('0.1.0')
  .option('-m, --market <data>', 'market to run bot on')
  .option('-i, --increase <n>', 'sell increase distance', parseFloat)
  .option('-v, --volume <n>', 'sell volume', parseInt)
  .option('-t, --ticker <data>', 'market to get ticker for')
  .option('-a, --accesskey <data>', 'Access KEY for API')
  .option('-s, --secretkey <data>', 'Secret KEY for API')
  .parse(process.argv);


if (program.ticker){
   var ani = chalkAnimation.rainbow('Ticker: ' + program.ticker);
   ani.start(); // Animation resumes
   graviex.ticker(program.ticker, function(res){
       if(!res.error){
           console.log(res);
       }else{
           console.log("ERROR: " + res)
       }
   });
}

if(program.secretkey){
    graviex.secretKey = program.secretkey;
    if(program.accesskey){
        graviex.accessKey = program.accesskey;
        //START
        if (program.market){
            if (program.increase){
                if (program.volume){
                    //DUMPER LOOP
                    chalkAnimation.pulse("[http://Merkle.Group | Graivex Dumper | info@merkle.group]");
                    DUMPIT(program.market, program.increase, program.volume);
        
                }else{
                    console.log("Error: Please insure you use the correct syntax: --volume");
                }
                
            }else{
                console.log("Error: Please insure you use the correct syntax: --increase");
            }
            
        }else{
            console.log("Error: Please insure you use the correct syntax: --market");
        }
    }else{
        console.log("Error: Please see example syntax/command you need to set your ACCESSKEY");
    }
}else{
    console.log("Error: Please see example syntax/command you need to set your SECRETKEY, try --help");
}

  


function DUMPIT(market, increase, volume){
    setInterval(function() {
        var ani = chalkAnimation.rainbow('Graviex Dumping '+ volume + " " + market + '...');
        mainDumpLoop(market, increase, volume);
        ani.start(); // Animation resumes
    }, 30 * 1000); // 60 * 1000 milsec
}

function mainDumpLoop(theMarket, increase, volume){
    //Close all orders, so we can be top of the sell list	
			graviex.orderBook(theMarket, function(res){
				if(!res.error){		
					var selling = parseFloat(res.asks[0].price);
                    console.log("[Selling]");
					console.log("Selling At: " + selling.toFixed(9));
					//check if those orders our ours, 
					var oursSell = false;
					graviex.orders("onzbtc", function(res){
						if(!res.error){
							//if not ours open orders + 1 and -1 each side of the market to try win spread
							//console.log(res);
							res.forEach(function(order){
								console.log(order.price);
								if(order.price == selling){
									oursSell = true;
								}
							});
            
                            var sellPrice = (selling - increase).toFixed(9);
			
							if(!oursSell){
                                console.log("Orders live are not ours, making new orders...");
                                graviex.clearAllOrders(function(res){
                                    if(!res.error){
                                        console.log("Removing old orders...");
                                        res.forEach(function(order){
                                            console.log(order.id + "|" + order.state + "|" + order.side);
                                        });
                                        //Dumping
                                        console.log("Sell Price: " + sellPrice);
                                        //sell
                                        graviex.createOrder("onzbtc", "sell", volume, sellPrice, function(res2){
                                            if(!res.error){
                                                console.log(res2.id + "|" + res2.state + "|" + res2.side);									
                                            }else{
                                                console.log(res)
                                                }
                                            });						
                                    }else{
                                        console.log(res)
                                    }
                                });							
								
							}else{
								console.log("Orders live are ours, doing nothing...");
							}
			
						}else{
							console.log(res)
						}
					});
			
				}else{
					console.log(res)
				}
			});
}