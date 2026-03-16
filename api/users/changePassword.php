<?php
include '../setup.php';

$user = require_auth($config, $mysqli);
$currentPassword = $receivedData['currentPassword'] ?? '';
$newPassword = $receivedData['newPassword'] ?? '';

if ($currentPassword === '' || $newPassword === '') {
    send_response('Current and new passwords are required', 400);
}

$stmt = $mysqli->prepare('SELECT password_hash FROM users WHERE id = ?');
$stmt->bind_param('i', $user['id']);
$stmt->execute();
$result = $stmt->get_result();
$row = $result ? $result->fetch_assoc() : null;

if (!$row || !password_verify($currentPassword, $row['password_hash'])) {
    send_response('Current password is incorrect', 400);
}

$hash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 12]);
$update = $mysqli->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
$update->bind_param('si', $hash, $user['id']);
$update->execute();

send_response('Password updated');
