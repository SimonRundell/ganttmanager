<?php
include '../setup.php';

setcookie('gm_token', '', [
    'expires' => time() - 3600,
    'path' => '/',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);

send_response('Logged out');
