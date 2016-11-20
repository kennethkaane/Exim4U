<?php
  include_once dirname(__FILE__) . "/config/variables.php";
  include_once dirname(__FILE__) . "/config/authsite.php";
  include_once dirname(__FILE__) . "/config/functions.php";
  include_once dirname(__FILE__) . "/config/httpheaders.php";

  if (isset($_POST['spamassassin'])) {
    $_POST['spamassassin'] = 1;
  } else {
    $_POST['spamassassin'] = 0;
  }

  if (isset($_POST['enabled'])) {
    $_POST['enabled'] = 1;
  } else {
    $_POST['enabled'] = 0;
  }

  if (isset($_POST['pipe'])) {
    $_POST['pipe'] = 1;
  } else {
    $_POST['pipe'] = 0;
  }

  if (!isset($_POST['max_accounts']) || $_POST['max_accounts'] == '') {
    $_POST['max_accounts'] = '0';
  }

  if (isset($_POST['clear'])) {
    if (validate_password($_POST['clear'], $_POST['vclear'])) {
      if (!password_strengthcheck($_POST['clear'])) {  
        header ("Location: sitechange.php?domain_id={$_POST['domain_id']}&domain={$_POST['domain']}&weakpass={$_POST['domain']}");
        die;
      }
      $query = "UPDATE users SET crypt=:crypt 
               WHERE localpart=:localpart AND domain_id=:domain_id";
      $sth = $dbh->prepare($query);
      $success = $sth->execute(array(':crypt'=>crypt_password($_POST['clear']),
               ':localpart'=>$_POST['localpart'],
               ':domain_id'=>$_POST['domain_id']));
      if ($success) {
      header ("Location: site.php?updated={$_POST['domain']}");
      die;
      } else {
      header ("Location: sitechange.php?domain_id={$_POST['domain_id']}&domain={$_POST['domain']}&failupdated={$_POST['domain']}");
      die;
      }
    } else {
      header ("Location: sitechange.php?domain_id={$_POST['domain_id']}&domain={$_POST['domain']}&badpass={$_POST['domain']}");
      die;
    }
  }

// User can specify either UID, or username, the former being preferred.
// Using posix_getpwuid/posix_getgrgid even when we have an UID is so we
// are sure the UID exists.
  if (isset ($_POST['uid'])) {
    $uid = $_POST['uid'];
  }
  if (isset ($_POST['gid'])) {
    $gid = $_POST['gid'];
  }
 
  if ($userinfo = @posix_getpwuid ($uid)) {
    $uid = $userinfo['uid'];
  } elseif ($userinfo = @posix_getpwnam ($uid)) {
    $uid = $userinfo['uid'];
  } else {
    header ("Location: sitechange.php?domain_id={$_POST['domain_id']}&domain={$_POST['domain']}&failuidguid={$_POST['domain']}");
    die;
  }
 
  if ($groupinfo = @posix_getgrgid ($gid)) {
    $gid = $groupinfo['gid'];
  } elseif ($groupinfo = @posix_getgrnam ($gid)) {
    $gid = $groupinfo['gid'];
  } else {
    header ("Location: sitechange.php?domain_id={$_POST['domain_id']}&domain={$_POST['domain']}&failuidguid={$_POST['domain']}");
    die;
  }

if ($multi_ip == "yes") { 
  $query = "UPDATE domains SET uid=:uid, gid=:gid,
           maxmsgsize=:maxmsgsize, pipe=:pipe, max_accounts=:max_accounts,
 	   quotas=:quotas, sa_tag=:sa_tag, sa_refuse=:sa_refuse,
 	   spamassassin=:spamassassin, enabled=:enabled,
	   outgoing_ip=:outgoing_ip
       WHERE domain_id=:domain_id";
  $sth = $dbh->prepare($query);
  $success = $sth->execute(array(':uid'=>$uid, ':gid'=>$gid,
       ':maxmsgsize'=>$_POST['maxmsgsize'],
       ':pipe'=>$_POST['pipe'], ':max_accounts'=>$_POST['max_accounts'],
       ':quotas'=>$_POST['quotas'],
       ':sa_tag'=>((isset($_POST['sa_tag'])) ? $_POST['sa_tag'] : $sa_tag),
       ':sa_refuse'=>((isset($_POST['sa_refuse'])) ? $_POST['sa_refuse'] : $sa_refuse),
       ':spamassassin'=>$_POST['spamassassin'], ':enabled'=>$_POST['enabled'],
       ':outgoing_ip'=>$_POST['outgoing_ip'],
       ':domain_id'=>$_POST['domain_id']
       ));
 } else {
  $query = "UPDATE domains SET uid=:uid, gid=:gid,
           maxmsgsize=:maxmsgsize, pipe=:pipe, max_accounts=:max_accounts,
           quotas=:quotas, sa_tag=:sa_tag, sa_refuse=:sa_refuse,
           spamassassin=:spamassassin, enabled=:enabled
       WHERE domain_id=:domain_id";
  $sth = $dbh->prepare($query);
  $success = $sth->execute(array(':uid'=>$uid, ':gid'=>$gid,
       ':maxmsgsize'=>$_POST['maxmsgsize'],
       ':pipe'=>$_POST['pipe'], ':max_accounts'=>$_POST['max_accounts'],
       ':quotas'=>$_POST['quotas'],
       ':sa_tag'=>((isset($_POST['sa_tag'])) ? $_POST['sa_tag'] : $sa_tag),
       ':sa_refuse'=>((isset($_POST['sa_refuse'])) ? $_POST['sa_refuse'] : $sa_refuse),
       ':spamassassin'=>$_POST['spamassassin'], ':enabled'=>$_POST['enabled'],
       ':domain_id'=>$_POST['domain_id']
       ));
}

  if ($success) {
    header ("Location: site.php?updated={$_POST['domain']}");
    die;
  }

// Just-in-case catchall
header ("Location: sitechange.php?domain_id={$_POST['domain_id']}&domain={$_POST['domain']}&failupdated={$_POST['domain']}");
?>
<!-- Layout and CSS tricks obtained from http://www.bluerobot.com/web/layouts/ -->
