<?php
include '../setup.php';

$token = $_GET['token'] ?? '';
if ($token === '') {
    send_response('Token required', 400);
}

$stmt = $mysqli->prepare('SELECT id, verify_token_exp FROM users WHERE verify_token = ? LIMIT 1');
$stmt->bind_param('s', $token);
$stmt->execute();
$result = $stmt->get_result();
$user = $result ? $result->fetch_assoc() : null;

if (!$user) {
    send_response('Invalid token', 400);
}

if ($user['verify_token_exp'] && strtotime($user['verify_token_exp']) < time()) {
    send_response('Token expired', 400);
}

$update = $mysqli->prepare('UPDATE users SET is_verified = 1, verify_token = NULL, verify_token_exp = NULL WHERE id = ?');
$update->bind_param('i', $user['id']);
$update->execute();

send_response('Email verified');
