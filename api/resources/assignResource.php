<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$taskId = (int) ($receivedData['task_id'] ?? 0);
$resourceId = (int) ($receivedData['resource_id'] ?? 0);
$allocation = (int) ($receivedData['allocation'] ?? 100);
$projectId = (int) ($receivedData['project_id'] ?? 0);

if ($taskId <= 0 || $resourceId <= 0 || $projectId <= 0) {
    send_response('Task, resource, and project IDs required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('INSERT INTO task_resources (task_id, resource_id, allocation) VALUES (?, ?, ?)');
$stmt->bind_param('iii', $taskId, $resourceId, $allocation);
$stmt->execute();

send_response('Resource assigned');
