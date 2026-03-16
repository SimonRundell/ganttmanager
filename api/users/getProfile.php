<?php
include '../setup.php';

$user = require_auth($config, $mysqli);

send_response([
    'user' => [
        'id' => (int) $user['id'],
        'email' => $user['email'],
        'screen_name' => $user['screen_name'],
        'avatar_path' => $user['avatar_path'],
        'role' => $user['role']
    ]
]);
