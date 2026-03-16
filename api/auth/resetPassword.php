<?php
include '../setup.php';

$token = trim($receivedData['token'] ?? '');
$password = $receivedData['password'] ?? '';

if ($token === '' || $password === '') {
    send_response('Token and password are required', 400);
}

$stmt = $mysqli->prepare('SELECT id, reset_token_exp FROM users WHERE reset_token = ? LIMIT 1');
$stmt->bind_param('s', $token);
$stmt->execute();
$result = $stmt->get_result();
$user = $result ? $result->fetch_assoc() : null;

if (!$user) {
    send_response('Invalid token', 400);
}

if ($user['reset_token_exp'] && strtotime($user['reset_token_exp']) < time()) {
    send_response('Token expired', 400);
}

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
$update = $mysqli->prepare('UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_exp = NULL WHERE id = ?');
$update->bind_param('si', $hash, $user['id']);
$update->execute();

send_response('Password updated');
