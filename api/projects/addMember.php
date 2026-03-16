<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$email = trim($receivedData['email'] ?? '');

if ($projectId <= 0 || $email === '') {
    send_response('Project ID and email are required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$member = $result ? $result->fetch_assoc() : null;

if (!$member) {
    send_response('User not found', 404);
}

$insert = $mysqli->prepare('INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, "member")');
$insert->bind_param('ii', $projectId, $member['id']);
$insert->execute();

send_response('Member added');
