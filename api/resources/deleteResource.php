<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$resourceId = (int) ($receivedData['id'] ?? 0);
$projectId = (int) ($receivedData['project_id'] ?? 0);

if ($resourceId <= 0 || $projectId <= 0) {
    send_response('Resource and project IDs required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('DELETE FROM resources WHERE id = ?');
$stmt->bind_param('i', $resourceId);
$stmt->execute();

send_response('Resource deleted');
