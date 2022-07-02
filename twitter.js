var Twitter=require('twitter')
var express=require('express')
var app=express()
var axios=require('axios')
var mysql=require('mysql')
const request=require('request')
//no apis token on github version
var client=new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
})
var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "Musicbot"
})
var tweet
var query='SELECT * FROM User'
con.connect(function(err){
    if(err)
    {
        console.log(err)
    }
    else{
        con.query(query,function(err,result,fields){
            if(err)
            {
                console.log(err)
            }
            else{
                for(var i=0;i<result.length;i++)
                { 
                    var user=result[i].twitteruser
                    var userfm=result[i].userfm  
                    var lastfmcall='http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='+userfm+'&period=7day&api_key=604024e30367d14d43eda34672a72cf2&format=json'             
                    axios.get(lastfmcall)
                    .then(function(response){
                            artist1=response.data.topalbums.album[0].artist.name
                            rank1=response["data"]["topalbums"]["album"][0]["@attr"]["rank"]
                            playcount1=response["data"]["topalbums"]["album"][0]["playcount"]
                            albumname1=response["data"]["topalbums"]["album"][0]["name"]

                            artist2=response.data.topalbums.album[1].artist.name
                            rank2=response["data"]["topalbums"]["album"][1]["@attr"]["rank"]
                            playcount2=response["data"]["topalbums"]["album"][1]["playcount"]
                            albumname2=response["data"]["topalbums"]["album"][1]["name"]

                            artist3=response.data.topalbums.album[2].artist.name
                            rank3=response["data"]["topalbums"]["album"][2]["@attr"]["rank"]
                            playcount3=response["data"]["topalbums"]["album"][2]["playcount"]
                            albumname3=response["data"]["topalbums"]["album"][2]["name"]

                            artist4=response.data.topalbums.album[3].artist.name
                            rank4=response["data"]["topalbums"]["album"][3]["@attr"]["rank"]
                            playcount4=response["data"]["topalbums"]["album"][3]["playcount"]
                            albumname4=response["data"]["topalbums"]["album"][3]["name"]

                            artist5=response.data.topalbums.album[4].artist.name
                            rank5=response["data"]["topalbums"]["album"][4]["@attr"]["rank"]
                            playcount5=response["data"]["topalbums"]["album"][4]["playcount"]
                            albumname5=response["data"]["topalbums"]["album"][4]["name"]
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                    .then(function(){
                        client.post('statuses/update', {status: '.@'+user+' top albums of the week: \r\n'+rank1+'. '+artist1+'-'+albumname1+': '+playcount1+'\r\n'+rank2+'. '+artist2+'-'+albumname2+': '+playcount2+'\r\n'+rank3+'. '+artist3+'-'+albumname3+': '+playcount3+'\r\n'+rank4+'. '+artist4+'-'+albumname4+': '+playcount4+'\r\n'+rank5+'. '+artist5+'-'+albumname5+': '+playcount5}, function(error, tweet, response) {
                            if (error) {
                                console.log("tweet"+tweet)
                                console.log(error)
                            }
                            else{
                                var lastfmcall2='http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+userfm+'&period=7day&api_key=604024e30367d14d43eda34672a72cf2&format=json'
                                id=tweet["id_str"]
                                console.log(tweet)
                                console.log(id)
                                axios.get(lastfmcall2)
                                .then(function(response){
                                    aristrank1=response["data"]["topartists"]["artist"][0]["@attr"]["rank"]
                                    artistname1=response["data"]["topartists"]["artist"][0]["name"]
                                    artistplaycount1=response["data"]["topartists"]["artist"][0]["playcount"]

                                    aristrank2=response["data"]["topartists"]["artist"][1]["@attr"]["rank"]
                                    artistname2=response["data"]["topartists"]["artist"][1]["name"]
                                    artistplaycount2=response["data"]["topartists"]["artist"][1]["playcount"]

                                    aristrank3=response["data"]["topartists"]["artist"][2]["@attr"]["rank"]
                                    artistname3=response["data"]["topartists"]["artist"][2]["name"]
                                    artistplaycount3=response["data"]["topartists"]["artist"][2]["playcount"]

                                    aristrank4=response["data"]["topartists"]["artist"][3]["@attr"]["rank"]
                                    artistname4=response["data"]["topartists"]["artist"][3]["name"]
                                    artistplaycount4=response["data"]["topartists"]["artist"][3]["playcount"]

                                    aristrank5=response["data"]["topartists"]["artist"][4]["@attr"]["rank"]
                                    artistname5=response["data"]["topartists"]["artist"][4]["name"]
                                    artistplaycount5=response["data"]["topartists"]["artist"][4]["playcount"]
                                })
                                .catch(function(err){
                                    console.log(err)
                                })
                                .then(function(){
                                    client.post('statuses/update', {status: '@'+user+' Top artists of the week:\r\n'+aristrank1+'. '+artistname1+': '+artistplaycount1+'\r\n'+aristrank2+'. '+artistname2+': '+artistplaycount2+'\r\n'+aristrank3+'. '+artistname3+': '+artistplaycount3+'\r\n'+aristrank4+'. '+artistname4+': '+artistplaycount4+'\r\n'+aristrank5+'. '+artistname5+': '+artistplaycount5,in_reply_to_status_id: id}, function(error, tweet, response) {
                                    if (error) {
                                        console.log("tweet"+tweet)
                                        console.log(error)
                                    }
                                    else{
                                        id=tweet["id_str"]
                                        console.log(id)
                                        var lastfmcall3='http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user='+userfm+'&period=7day&api_key=604024e30367d14d43eda34672a72cf2&format=json'
                                        axios.get(lastfmcall3)
                                        .then(function(response){
                                            console.log(response["data"]["toptracks"]["track"][0])
                                            trackrank1=response["data"]["toptracks"]["track"][0]["@attr"]["rank"]
                                            trackartist1=response["data"]["toptracks"]["track"][0]["artist"]["name"]
                                            trackname1=response["data"]["toptracks"]["track"][0]["name"]
                                            trackplacount1=response["data"]["toptracks"]["track"][0]["playcount"]

                                            trackrank2=response["data"]["toptracks"]["track"][1]["@attr"]["rank"]
                                            trackartist2=response["data"]["toptracks"]["track"][1]["artist"]["name"]
                                            trackname2=response["data"]["toptracks"]["track"][1]["name"]
                                            trackplacount2=response["data"]["toptracks"]["track"][1]["playcount"]

                                            trackrank3=response["data"]["toptracks"]["track"][2]["@attr"]["rank"]
                                            trackartist3=response["data"]["toptracks"]["track"][2]["artist"]["name"]
                                            trackname3=response["data"]["toptracks"]["track"][2]["name"]
                                            trackplacount3=response["data"]["toptracks"]["track"][2]["playcount"]

                                            trackrank4=response["data"]["toptracks"]["track"][3]["@attr"]["rank"]
                                            trackartist4=response["data"]["toptracks"]["track"][3]["artist"]["name"]
                                            trackname4=response["data"]["toptracks"]["track"][3]["name"]
                                            trackplacount4=response["data"]["toptracks"]["track"][3]["playcount"]

                                            trackrank5=response["data"]["toptracks"]["track"][4]["@attr"]["rank"]
                                            trackartist5=response["data"]["toptracks"]["track"][4]["artist"]["name"]
                                            trackname5=response["data"]["toptracks"]["track"][4]["name"]
                                            trackplacount5=response["data"]["toptracks"]["track"][4]["playcount"]
                                        })
                                        .catch(function(err){
                                            console.log(err)
                                        })
                                        .then(function(){
                                            client.post('statuses/update', {status: '@'+user+' Top tracks of the week:\r\n'+trackrank1+'. '+trackartist1+'-'+trackname1+': '+trackplacount1+'\r\n'+trackrank2+'. '+trackartist2+'-'+trackname2+': '+trackplacount2+'\r\n'+trackrank3+'. '+trackartist3+'-'+trackname3+': '+trackplacount3+'\r\n'+trackrank4+'. '+trackartist4+'-'+trackname4+': '+trackplacount4,in_reply_to_status_id: id}, function(error, tweet, response) {
                                                if (error) {
                                                    console.log("tweet"+tweet)
                                                    console.log(error)
                                                }
                                                else{
                                                    console.log(tweet)
                                                }
                                            })
                                        })
                                    }
                                  })
                                })                                
                            }
                          })
                    })
                }
            }
        })
    }
})
/*
*/
/*
client.post('statuses/update', {status: '@icriedeverytime I am a tweet'}, function(error, tweet, response) {
    if (!error) {
        console.log(tweet)
        console.log(error)
    }
    else{
        console.log(tweet)
    }
  });
const apikey='yPF5I5j0oPkQM1ZK1DyfkERZL'
const apikeysecret='4WgiIw1GJ3nFHB6U9fDWuyXuSQr1pQIPpLC1msrzInBS1s9Wkz'
const bearertoken='AAAAAAAAAAAAAAAAAAAAAFtHXgEAAAAAo0DF71I45CeQXoBmaRDRwwXsBFE%3D9ir8C4TC4tqQIV9VyeMszqz7ibVC8rs0z3D4erleFdzuEAIb0w'
const accestoken='3322969478-62jcRYuqe6iCQTFBBVyKDpeSaoPiJyov9aQHahU'
const accestokensecret='PNyPp4gUep9TIhxbjxyeNqCDtT19qsZisdSvDjYl2XDdJ'*/