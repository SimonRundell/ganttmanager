<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$orders = $receivedData['orders'] ?? [];

if ($projectId <= 0 || !is_array($orders)) {
    send_response('Project ID and orders are required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('UPDATE tasks SET wbs_order = ? WHERE id = ? AND project_id = ?');
foreach ($orders as $order) {
    $wbsOrder = (int) ($order['wbs_order'] ?? 0);
    $taskId = (int) ($order['id'] ?? 0);
    if ($taskId <= 0) {
        continue;
    }
    $stmt->bind_param('iii', $wbsOrder, $taskId, $projectId);
    $stmt->execute();
}

send_response('Tasks reordered');
