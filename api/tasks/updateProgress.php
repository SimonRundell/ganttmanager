<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$taskId = (int) ($receivedData['id'] ?? 0);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$progress = (int) ($receivedData['progress'] ?? 0);

if ($taskId <= 0 || $projectId <= 0) {
    send_response('Task and project IDs are required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('UPDATE tasks SET progress = ? WHERE id = ?');
$stmt->bind_param('ii', $progress, $taskId);
$stmt->execute();

send_response('Progress updated');
