function conex(e) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;

	xhr.open("GET", "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=jhozeomar");
	xhr.setRequestHeader("Authorization",' OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1468172322",oauth_nonce="2910112325",oauth_version="1.0",oauth_token="357588214-2vTUZeUMgyMrI2JWPLEaqfl8spqVutdUAzqhLb5J",oauth_signature="eNTqfBnK2bQAAj%2FhSlnKP7mdJaM%3D"');

	xhr.onload = function() {
		var tweets = JSON.parse(this.responseText);
		console.log("******" +tweets);
		for (var c = 0; c < tweets.length; c++) {

			var tweet = tweets[c].text;
			var user = tweets[c].user.screen_name;

			alert("Tweet: " + tweet + " Usuario: " + user);
		}
	};

	xhr.send();
}

$.index.open();
