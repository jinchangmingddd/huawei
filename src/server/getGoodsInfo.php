<?php

    // 1.接收参数
    $id = $_GET['goods_id'];

    // 2.查询数据库
    $link = mysqli_connect('localhost','root','root','huawei');
    $sql = "SELECT * FROM `goods` WHERE `goods_id`='$id'";

    $res = mysqli_query($link,$sql);

    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    // 返回结果给前端
    echo json_encode(array(
        'message' => '获取商品列表成功',
        "code" => 1,
        "info" => $data[0],
    ));


?>