const storyData = [
    {
        id: "start",
        text: "Bạn tỉnh dậy trong một căn hầm tối tăm. Đầu đau như búa bổ. Không khí nồng nặc mùi ẩm mốc và rỉ sét. Ánh sáng duy nhất đến từ khe cửa sắt khép hờ phía trên.",
        image: "hầm_tối.jpg",
        choices: [
            {
                text: "Kiểm tra túi quần",
                nextScene: "check_pockets",
                reward: null
            },
            {
                text: "Cố gắng đẩy cửa hầm",
                nextScene: "push_door_fail",
                requiredItem: null
            }
        ]
    },
    {
        id: "check_pockets",
        text: "Bạn lục lọi túi quần và tìm thấy một chiếc bật lửa Zippo còn chút xăng và một mẩu giấy ghi: 'Đừng tin ai cả'.",
        image: "bật_lửa.jpg",
        choices: [
            {
                text: "Bật lửa lên soi xung quanh",
                nextScene: "light_up",
                reward: "Bật lửa"
            }
        ]
    },
    {
        id: "push_door_fail",
        text: "Cánh cửa nặng trịch không hề nhúc nhích. Có vẻ nó đã bị khóa chặt hoặc chặn từ bên ngoài. Bạn kiệt sức và mất 10 máu.",
        image: "cửa_khóa.jpg",
        hpCost: 10,
        choices: [
            {
                text: "Nghỉ ngơi một chút rồi tìm cách khác",
                nextScene: "start",
                reward: null
            }
        ]
    },
    {
        id: "light_up",
        text: "Ánh lửa bập bùng soi rõ góc phòng. Bạn thấy một thanh xà beng nằm dưới đống giẻ rách.",
        image: "xà_beng.jpg",
        choices: [
            {
                text: "Nhặt xà beng",
                nextScene: "got_crowbar",
                reward: "Xà beng"
            },
            {
                text: "Bỏ qua, đi ra cửa",
                nextScene: "door_locked_again",
                requiredItem: null
            }
        ]
    },
    {
        id: "got_crowbar",
        text: "Thanh xà beng lạnh ngắt và nặng trịch trong tay bạn. Đây có thể là chìa khóa để thoát khỏi đây.",
        image: "cầm_xà_beng.jpg",
        choices: [
            {
                text: "Dùng xà beng cạy cửa hầm",
                nextScene: "escape_bunker",
                requiredItem: "Xà beng"
            }
        ]
    },
    {
        id: "door_locked_again",
        text: "Bạn quay lại cửa hầm. Nó vẫn đóng chặt. Nếu không có dụng cụ, bạn sẽ chết rũ xương ở đây.",
        image: "cửa_khóa.jpg",
        choices: [
            {
                text: "Quay lại tìm đồ",
                nextScene: "light_up",
                reward: null
            }
        ]
    },
    {
        id: "escape_bunker",
        text: "KÉT... KÉT...! Tiếng kim loại va nghiến chói tai. Cánh cửa bật mở. Ánh nắng chói chang ập vào mắt bạn. Chào mừng đến với Địa ngục trần gian.",
        image: "thế_giới_bên_ngoài.jpg",
        choices: [
            {
                text: "Leo ra ngoài (Hết Demo)",
                nextScene: "end_demo",
                reward: null
            }
        ]
    },
    {
        id: "end_demo",
        text: "Chúc mừng bạn đã thoát khỏi căn hầm! Phần tiếp theo đang được phát triển...",
        image: "the_end.jpg",
        choices: []
    }
];
