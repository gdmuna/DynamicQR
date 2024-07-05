-- 二维码活码信息表

CREATE TABLE `dynamicqr`.`qrcode`  (
    `id` uuid NOT NULL COMMENT '活码ID',
    `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '活码名称',
    `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活码描述',
    `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '解析内容',
    `create_time` datetime NOT NULL COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
    `create_by` uuid NOT NULL COMMENT '所属用户',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `check_qrcode_belong`(`create_by` ASC) USING BTREE,
    CONSTRAINT `check_qrcode_belong` FOREIGN KEY (`create_by`) REFERENCES `dynamicqr`.`userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '二维码活码信息表' ROW_FORMAT = Dynamic;
