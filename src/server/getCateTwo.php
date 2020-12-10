<?
    // 接收一级分类
    $one = $_GET['cat_one'];

    $link = mysqli_connect('localhost','root','root','huawei');
    // 这条语句的意思是，从cat_two_one中将相同的分为一类，然后选中
    $sql = "SELECT `cat_two_id` FROM `goods` WHERE `cat_one_id`='$one' GROUP BY  `cat_two_id`";

    $res = mysqli_query($link,$sql);

    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    // 返回结果给前端
    echo json_encode(array(
        'message' => '获取二级列表成功',
        "code" => 1,
        "list" => $data
    ));

?>