<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($_GET['projectId'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$sql = 'SELECT u.id, u.email, u.screen_name, u.role, m.role AS member_role FROM project_members m JOIN users u ON m.user_id = u.id WHERE m.project_id = ?';
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('i', $projectId);
$stmt->execute();
$result = $stmt->get_result();

$members = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $members[] = $row;
    }
}

send_response(['members' => $members]);
