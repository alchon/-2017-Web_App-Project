# [2017] ERICA_restaurant
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Laguage](https://img.shields.io/badge/html-5-green.svg)
![Laguage](https://img.shields.io/badge/css-3-green.svg)
![Laguage](https://img.shields.io/badge/php-7-green.svg)

## Members
- [thy2134](https://github.com/thy2134) : Kyu-Jin Cho
- [alchon](https://github.com/alchon) : Hyeon-Beom Seo
- [JoonHyukYang](https://github.com/JoonHyukYang) : Joon-Hyuk Yang
- [Byeon-jaeheon](https://github.com/Byeon-jaeheon) : Jae-Heon Byeon
- [ProDroper](https://github.com/ProDroper) : Jun Choi


## Intoroduction
When we have a lunch time, we have to think what to eat. As you know this is very hard.  
So, we thought about list of restaurants in front of the school by category.  
Our project informs about restaurants.  

## Demo  
[ERICA_restaurant](https://what-to-eat-erica.duckdns.org:8443/)

## Features  
- Search restaurants based on name or category.  
- Find nearby restaurants based on my location.  
- Write comments each restaurants.  
- You can get recommended restaurants by drawing lots.  
- Restaurants world cup.  

## Execute  
Requirements: cURL, PHP7, Apache2, MySQL or MariaDB  
```
1. git clone https://github.hub/alchon/ERICA_restaurant.git
2. cd ERICA_restaurant
3. cd api/include
4. curl -sS https://getcomposer.org/installer | php
5. php composer.phar install
```  
Apache2 VirtualHost
```
<Directory "Repository directory">
    Options FollowSymLinks
    AllowOverride All

    Order allow,deny
    Allow from all
</Directory>
```  

HTTPS 위에서 돌아가야 하는 서비스이므로(현재 위치를 가져오려면 브라우저에서  HTTPS 연결을 강제) 꼭 HTTPS 위에 올려서 쓸 것  

api/include/core.php 
```
$dbname, $host, $username. $password -> Modify variables to match server settings
```  
api 폴더에 .htaccess 파일이 없을 경우 다음 내용을 담은 .htaccess 파일을 추가 
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . index.php [L]
```
sql/ dump.sql -> load DB.  
Put it on the Apache server and run it.  

## Feedback  
To report bugs, please create a GitHub issue.  
