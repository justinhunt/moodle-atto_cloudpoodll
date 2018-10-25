Cloud Poodll for Moodle Atto

This is an audio and video recording plugin for Moodle's Atto HTML editor. It can also accept file uploads, and generate automatic subtitles if the audio is in English or Spanish. It requires an API username and secret associated with a subscription from https://poodll.com

1. Download
============
Download the plugin from: https://github.com/justinhunt/moodle-atto_cloudpoodll


2 Unzip / Rename / Upload
============
Expand (unzip) the zip file. 

Rename the main folder to "cloudpoodll." It should contain all the files like "version.php."

Upload the "cloudpoodll" folder into the folder

[PATH TO MOODLE]/lib/editor/atto/plugins 


3. Get Moodle to Install It 
============
Visit Settings > Site Administration > Notifications, and let Moodle guide you through the install.


4. Configure it
============
Go to Site Administration > Plugins > Text Editors > Atto Toolbar Settings  

Now add Cloud poodll to the menu structure near the bottom of the page

  e.g style1 = title, bold, italic, cloudpoodll

  The Cloud Poodll icons should now appear on the Atto HTML editor toolbar.


5. A few notes
============
Cloud Poodll connects to https://cloud.poodll.com and https://maxcdn.bootstrapcdn.com and so will not work without access to the internet.



Thats all.

Justin Hunt
https://poodll.com