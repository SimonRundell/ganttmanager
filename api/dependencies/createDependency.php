<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$predecessor = (int) ($receivedData['predecessor_id'] ?? 0);
$successor = (int) ($receivedData['successor_id'] ?? 0);
$type = $receivedData['type'] ?? 'FS';

if ($projectId <= 0 || $predecessor <= 0 || $successor <= 0) {
    send_response('Dependency data missing', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('INSERT INTO dependencies (project_id, predecessor_id, successor_id, type) VALUES (?, ?, ?, ?)');
$stmt->bind_param('iiis', $projectId, $predecessor, $successor, $type);
$stmt->execute();

send_response(['dependency_id' => $stmt->insert_id], 201);
