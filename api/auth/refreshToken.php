<?php
include '../setup.php';

$token = get_bearer_token();
if (!$token) {
    send_response('Unauthorized', 401);
}

$claims = [];
$errorMessage = '';
$errorCode = 401;
if (!verify_jwt($token, $config, $claims, $errorCode, $errorMessage)) {
    send_response($errorMessage !== '' ? $errorMessage : 'Unauthorized', $errorCode);
}

$userId = (int) ($claims['sub'] ?? 0);
if ($userId <= 0) {
    send_response('Unauthorized', 401);
}

$stmt = $mysqli->prepare('SELECT role FROM users WHERE id = ? LIMIT 1');
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result ? $result->fetch_assoc() : null;
if (!$user) {
    send_response('Unauthorized', 401);
}

$jwt = create_jwt($userId, $config, $user['role']);
set_auth_cookie($jwt['token'], $jwt['exp']);

send_response(['tokenExpires' => $jwt['exp']]);
