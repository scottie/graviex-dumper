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
  .option('-m, --market <data>', 'market to run bot on, ie: btc, ltc, eth')
  .option('-s, --coin <data>', 'coin ticker, ie: gio')
  .option('-i, --increase <n>', 'sell increase distance', parseFloat)
  .option('-v, --volume <data>', 'sell volume')
  .option('-t, --ticker <data>', 'market to get ticker for')
  .option('-a, --accesskey <data>', 'Access KEY for API')
  .option('-s, --secretkey <data>', 'Secret KEY for API')
  .option('-s, --looptime <n>', 'time for break in seconds ie: 60', parseInt)
  
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
        if (program.looptime){
        if (program.coin){
        if (program.market){
            if (program.increase){
                if (program.volume){
                    //sell all or sell volume?
                    var vol;
                    if(program.volume == "ALL"){
                        console.log("[VOLUME = ALL | SELLING ENTIRE BALANCE FOR VOLUME]");
                        //get balance of market and sell ALL
                        DUMPIT(program.coin + program.market, program.increase, vol);

                    }else{
                        vol = program.volume;
                        //DUMPER NOT ALL
                        chalkAnimation.pulse("[http://Merkle.Group | Graivex Dumper | info@merkle.group]");
                        DUMPIT(program.coin + program.market, program.increase, vol);
                    }
                    
        
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
            console.log("Error: Please insure you use the correct syntax: --coin");
        }
    }else{
        console.log("Error: Please insure you use the correct syntax: --looptime");
    }
    }else{
        console.log("Error: Please see example syntax/command you need to set your ACCESSKEY");
    }
}else{
    console.log("Error: Please see example syntax/command you need to set your SECRETKEY, try --help");
}


function DUMPIT(market, increase, volume){    
    setInterval(function() {
        coinBalance(program.coin, function(balance){
            if(!balance.error){
                console.log("[" + program.coin+ " Balance] " + balance.balance);
                vol = parseInt(balance.balance)
                console.log("[SYMBOL]: " + market);
                //DUMPER ALL
                chalkAnimation.pulse("[http://Merkle.Group | Graivex Dumper | info@merkle.group]");
                var ani = chalkAnimation.rainbow('Graviex Dumping '+ volume + " " + market + '...');
                mainDumpLoop(market, increase, balance.balance);
                ani.start(); // Animation resumes
            }else{
                console.log(balance.error);
                console.log("Error: are you sure that coin exists? ie: syntax: --coin gio");
                console.log("[COIN]: " + program.coin)
                return;

            }
        })

    }, program.looptime * 1000); // 60 * 1000 milsec
}

/*
coinBalance(alt_coin, function(balance){
	if(!balance.error){
		console.log(balance.balance);
	}
});
*/
function coinBalance(altcoin, callback){
	graviex.account(function(res){
		if(!res.error){
			//console.log(res.accounts);
			res.accounts.forEach(element => {
				if(element.currency == altcoin){
					return callback(element);
				}				
			}); 
		}else{
			return callback({error:res});
		}
	});
}

//clearOrdersForMarket("onzbtc", function(r){
//    console.log(r)
//});

function clearOrdersForMarket(market, callback){
    graviex.orders(market, function(res){
        if(res.toString() == ""){
            return callback({success:true, data:"nothing to remove"});
        }else{
            if(!res.error){
                console.log("[Remove Order "+market+"]: " + res[0].id)
                graviex.cancelOrder(res[0].id, function(res){
                    if(!res.error){
                        return callback({success:true, data:res});

                    }else{
                        return callback({success:false, error:res.error});
                    }
                });
            }else{
                //console.log(res)
            }
        }
    });



    //return callback("");
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
					graviex.orders(theMarket, function(res){
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
                                clearOrdersForMarket(theMarket, function(res){
                                    if(!res.error){
                                        console.log("[Removing Old Orders]: Success == " + res.success);
                                        //Dumping
                                        console.log("Sell Price: " + sellPrice);
                                        //sell
                                        console.log("[ORDER LOG] " + theMarket + " SELL Volume: " + volume + " sellPrice: " + selling);
                                        graviex.createOrder(theMarket, "sell", volume, sellPrice, function(res2){
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
