<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$userId = (int) ($receivedData['user_id'] ?? 0);

if ($projectId <= 0 || $userId <= 0) {
    send_response('Project ID and user ID are required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('DELETE FROM project_members WHERE project_id = ? AND user_id = ?');
$stmt->bind_param('ii', $projectId, $userId);
$stmt->execute();

send_response('Member removed');
