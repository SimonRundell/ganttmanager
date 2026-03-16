<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$dependencyId = (int) ($receivedData['id'] ?? 0);
$projectId = (int) ($receivedData['project_id'] ?? 0);

if ($dependencyId <= 0 || $projectId <= 0) {
    send_response('Dependency ID and project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('DELETE FROM dependencies WHERE id = ?');
$stmt->bind_param('i', $dependencyId);
$stmt->execute();

send_response('Dependency deleted');
