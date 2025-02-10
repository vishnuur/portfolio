import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Load the Facebook SDK for JavaScript
    if (window.FB) {
      window.FB.XFBML.parse(); // Re-parse to render fb-page plugin
      return;
    }
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0";
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = () => {
        window.FB && window.FB.XFBML.parse(); // Parse once SDK is loaded
      };
    })(document, 'script', 'facebook-jssdk');
  }, []);
  useEffect(() => {
    // Load YouTube's Subscribe Button script
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/vishnu.cool.526"
        data-tabs="timeline"
        data-width="360"
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/ShashiTharoor"
          class="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/ShashiTharoor">Shashi Tharoor</a>
        </blockquote>
      </div>
      <div>
      <h2>Subscribe to My YouTube Channel</h2>
      <div
        className="g-ytsubscribe"
        data-channelid="@ShashiTharoorOfficial" // Replace with your actual YouTube channel ID
        data-layout="full"
        data-theme="dark"
        data-count="default"
      ></div>
    </div>
    </div>
  );
}
