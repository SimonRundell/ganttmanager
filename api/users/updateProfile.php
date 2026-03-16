<?php
include '../setup.php';

$user = require_auth($config, $mysqli);
$screenName = trim($receivedData['screen_name'] ?? '');

if ($screenName === '') {
    send_response('Screen name is required', 400);
}

$stmt = $mysqli->prepare('UPDATE users SET screen_name = ? WHERE id = ?');
$stmt->bind_param('si', $screenName, $user['id']);
$stmt->execute();

send_response('Profile updated');
