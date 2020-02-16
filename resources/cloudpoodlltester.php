<?php

/**
 * Cloud Poodll Tester Page (php)
 *
 *
 *
 * @author Justin Hunt (https://poodll.com)
 */
?>
<?php

$token = fetchToken();

function fetchToken()
{
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        //CURLOPT_URL => 'http://localhost/moodle/local/cpapi/poodlltoken.php?username=testuser&password=TestUser-01&service=cloud_poodll'
        CURLOPT_URL => 'https://cloud.poodll.com/local/cpapi/poodlltoken.php?username=testuser&password=TestUser-01&service=cloud_poodll'
    ));
// Send the request & save response to $resp
    $resp = curl_exec($curl);
    $token="";
    if ($resp) {
        $resp_object = json_decode($resp);
        $token = $resp_object->token;
    }

// Close request to clear up some resources
    curl_close($curl);
    return $token;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CloudPoodllTester</title>
    <script src="https://cdn.jsdelivr.net/gh/justinhunt/cloudpoodll@latest/amd/build/cloudpoodll.min.js" type="text/javascript"></script>
    <!-- script src="http://localhost/moodle/local/cpapi/cloudpoodll/amd/src/cloudpoodll.js" type="text/javascript"></script -->
</head>
<body>
--Recorder below here--
<div class="cloudpoodll"
     data-id="banana1"
     data-appid="poodll"
     data-localloading="auto"
     data-localloader="/poodllloader.html"
     data-width="450"
     data-transcode="1"
     data-transcoder="default"
     data-transcribe="1"
     data-subtitle="0"
     data-speechevents="1"
     data-language="en-US"
     data-media="video"
     data-owner="jerry@poodll.com"
     data-height="500"
     data-region="useast1"
     data-expiredays="180"
     data-parent="http://localhost"
     data-token="<?= $token ?>"></div>

--Recorder above here--
<script type="text/javascript">
CloudPoodll.autoCreateRecorders("cloudpoodll");
CloudPoodll.theCallback=function(thedata){
    switch (thedata.type){
        case 'error':
            alert('Error: ' + thedata.message);
            break;
        case 'awaitingprocessing':
            console.log('awaitingprocessing:');
            console.log(thedata);
            break;
        case 'filesubmitted':
            alert('filesubmitted:' + thedata.mediaurl);
            console.log('filesubmitted:');
            console.log(thedata);
            break;
        case 'transcriptioncomplete':
            alert('transcriptioncomplete:' + thedata.transcription);
            break;
        default:
            console.log(thedata.type,thedata);
    }
};
CloudPoodll.initEvents();
</script>
</body>
</html>