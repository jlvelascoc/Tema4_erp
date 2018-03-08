<?php
$data= $_POST['json'];

$fd = fopen("backup.json", "w+");
fwrite($fd, $data);
fclose($fd);
?>
