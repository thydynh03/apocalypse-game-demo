const storyData = [
    // ========== PHẦN 1: THOÁT KHỎI HẦM ==========
    {
        id: "start",
        text: "Bạn tỉnh dậy trong một căn hầm tối tăm. Đầu đau như búa bổ. Không khí nồng nặc mùi ẩm mốc và rỉ sét. Ánh sáng duy nhất đến từ khe cửa sắt khép hờ phía trên. Bạn không nhớ mình đã tới đây như thế nào...",
        choices: [
            {
                text: "Kiểm tra túi quần",
                nextScene: "check_pockets"
            },
            {
                text: "Cố gắng đẩy cửa hầm",
                nextScene: "push_door_fail"
            }
        ]
    },
    {
        id: "check_pockets",
        text: "Bạn lục lọi túi quần và tìm thấy một chiếc bật lửa Zippo còn chút xăng. Trong túi còn có một mẩu giấy gấp nhỏ. Bạn mở ra và đọc thấy dòng chữ viết nguệch ngoạc: 'ĐỪNG TIN AI CẢ'.",
        choices: [
            {
                text: "Cất giấy vào túi (Nhặt ghi chú)",
                nextScene: "check_note",
                note: "Ghi chú bí ẩn"
            },
            {
                text: "Bật lửa lên soi xung quanh",
                nextScene: "light_up",
                reward: "Bật lửa"
            }
        ]
    },
    {
        id: "check_note",
        text: "Bạn cẩn thận gấp mẩu giấy lại và cất vào túi sâu. Lời cảnh báo này có thể quan trọng sau này...",
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
        text: "Cánh cửa nặng trịch không hề nhúc nhích. Có vẻ nó đã bị khóa chặt hoặc chặn từ bên ngoài. Bạn cố hết sức nhưng chỉ làm mình kiệt sức. Mất 10 máu.",
        hpCost: 10,
        choices: [
            {
                text: "Nghỉ ngơi một chút rồi tìm cách khác",
                nextScene: "start"
            }
        ]
    },
    {
        id: "light_up",
        text: "Ánh lửa bập bùng soi rõ góc phòng. Bạn thấy một thanh xà beng nằm dưới đống giẻ rách. Tường hầm phủ đầy vết máu đã khô và vài ba vết cào móng tay đầy tuyệt vọng.",
        choices: [
            {
                text: "Nhặt xà beng",
                nextScene: "got_crowbar",
                reward: "Xà beng"
            },
            {
                text: "Bỏ qua, đi thẳng ra cửa",
                nextScene: "door_locked_again"
            }
        ]
    },
    {
        id: "got_crowbar",
        text: "Thanh xà beng lạnh ngắt và nặng trịch trong tay bạn. Gỉ sét bám dày trên bề mặt nhưng vẫn còn rất chắc chắn. Đây có thể là chìa khóa để thoát khỏi đây.",
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
        text: "Bạn quay lại cửa hầm. Nó vẫn đóng chặt như đá tảng. Nếu không có dụng cụ, bạn sẽ chết rũ xương ở đây trong bóng tối.",
        choices: [
            {
                text: "Quay lại tìm đồ",
                nextScene: "light_up"
            }
        ]
    },
    {
        id: "escape_bunker",
        text: "KÉT... KÉT...! Tiếng kim loại va nghiến chói tai. Cánh cửa từ từ bật mở. Ánh nắng chói chang ập vào, bạn phải che mắt lại. Khi đôi mắt đã quen, bạn nhìn thấy thứ khiến tim mình tắt ngấm... Chào mừng đến với Địa ngục trần gian.",
        choices: [
            {
                text: "Leo ra ngoài",
                nextScene: "outside_world"
            }
        ]
    },

    // ========== PHẦN 2: THẾ GIỚI BÊN NGOÀI ==========
    {
        id: "outside_world",
        text: "Thế giới bên ngoài là một bãi hoang tàn. Bầu trời xám xịt, không có một tia nắng. Toà nhà đổ nát, xe cộ lật nghiêng khắp nơi. Thi thể và bộ xương rải rác trên đường phố. Gió thổi mang theo mùi tử khí nồng nặc. Bạn thấy dấu vết người sống đi qua không xa...",
        choices: [
            {
                text: "Đi theo dấu vết",
                nextScene: "found_survivor"
            },
            {
                text: "Tìm nơi trú ẩn an toàn hơn",
                nextScene: "search_shelter"
            },
            {
                text: "Đi về phía thành phố",
                nextScene: "city_ruins"
            }
        ]
    },
    {
        id: "found_survivor",
        text: "Sau 20 phút lần theo dấu vết, bạn gặp một người đàn ông gầy gò, râu ria xồm xoàm, mặc áo khoác rách. Anh ta giật mình khi thấy bạn, tay nắm chặt con dao rỉ sét.\n\n\"Đứng lại! Mày là ai?\" - Anh ta hét lên, giọng run rẩy.\n\nNhưng sau đó, ánh mắt anh ta dịu lại: \"Xin lỗi... Đã lâu rồi tao không gặp người sống. Tao là Minh. Mày... mày có muốn đi cùng không? Tao biết chỗ trú ẩn.\"",
        choices: [
            {
                text: "Tin Minh và đi cùng anh ta",
                nextScene: "trust_survivor"
            },
            {
                text: "Nhớ lại mẩu giấy 'Đừng tin ai cả' và từ chối",
                nextScene: "distrust_survivor",
                requiredNote: "Ghi chú bí ẩn"
            },
            {
                text: "Hỏi thêm thông tin trước khi quyết định",
                nextScene: "question_survivor"
            }
        ]
    },
    {
        id: "trust_survivor",
        text: "Bạn gật đầu và quyết định tin Minh. Hai người đi qua những con phố đổ nát. Minh dẫn bạn đến một toà nhà bỏ hoang. Khi bạn bước vào, cửa đóng sập phía sau. Ánh đèn pin bật sáng - hàng chục đôi mắt nhìn bạn từ bóng tối.\n\n\"Xin lỗi...\" - Minh thì thầm - \"Chúng tao cần đồ ăn để sống sót...\"",
        hpCost: 50,
        choices: [
            {
                text: "Cố gắng chạy thoát (mất 50 HP)",
                nextScene: "escape_ambush"
            },
            {
                text: "Đầu hàng",
                nextScene: "bad_ending"
            }
        ]
    },
    {
        id: "distrust_survivor",
        text: "Bạn nhớ lại lời cảnh báo trên mẩu giấy: 'ĐỪNG TIN AI CẢ'. Bạn lắc đầu:\n\n\"Xin lỗi, tôi thích đi một mình.\"\n\nMặt Minh tái đi. Anh ta gằn giọng: \"Sai lầm to đấy...\" rồi rút dao lao tới. Nhưng bạn đã chuẩn bị sẵn, dùng xà beng đỡ đòn và đánh anh ta ngã lăn. Bạn chạy thoát.",
        choices: [
            {
                text: "Tiếp tục tìm nơi trú ẩn",
                nextScene: "search_shelter"
            },
            {
                text: "Đi về phía thành phố",
                nextScene: "city_ruins"
            }
        ]
    },
    {
        id: "question_survivor",
        text: "Bạn hỏi Minh về nơi trú ẩn, về những gì đã xảy ra. Minh kể rằng đã 3 tháng kể từ 'Ngày Tận Thế' - một loại virus lạ lan nhanh biến người thành quái vật. Anh ta nói có một nhóm người sống sót ở khu trường học cũ, nơi an toàn hơn.\n\nNhưng có gì đó trong ánh mắt anh ta khiến bạn không hoàn toàn tin tưởng...",
        choices: [
            {
                text: "Tin Minh và đi cùng",
                nextScene: "trust_survivor"
            },
            {
                text: "Cảm ơn nhưng đi một mình",
                nextScene: "distrust_survivor",
                requiredNote: "Ghi chú bí ẩn"
            }
        ]
    },
    {
        id: "escape_ambush",
        text: "Bạn lao về phía cửa sổ và nhảy ra ngoài. Mảnh kính cắt vào da thịt nhưng bạn vẫn sống sót. Đằng sau, tiếng la hét và tiếng chạy rộn ràng dần nhạt đi. Bạn chạy hết mình vào bóng đêm...",
        hpCost: 20,
        choices: [
            {
                text: "Tìm nơi băng bó vết thương",
                nextScene: "search_shelter"
            }
        ]
    },
    {
        id: "search_shelter",
        text: "Bạn tìm được một cửa hàng tạp hóa nhỏ chưa bị phá hoại hoàn toàn. Bên trong còn vài lon thực phẩm đóng hộp và nước uống. Bạn băng bó vết thương và nghỉ ngơi. HP hồi phục +30.",
        hpCost: -30,
        choices: [
            {
                text: "Ở lại đây qua đêm",
                nextScene: "safe_shelter"
            },
            {
                text: "Lấy đồ rồi tiếp tục di chuyển",
                nextScene: "city_ruins"
            }
        ]
    },
    {
        id: "safe_shelter",
        text: "Đêm qua yên ắng. Bạn ngủ được vài giờ, giấc ngủ đầu tiên kể từ khi tỉnh dậy trong hầm. Sáng hôm sau, bạn cảm thấy khỏe hơn. HP hồi phục thêm +20.",
        hpCost: -20,
        choices: [
            {
                text: "Tiếp tục hành trình về phía thành phố",
                nextScene: "city_ruins"
            },
            {
                text: "Tìm kiếm thêm vật dụng ở khu vực này",
                nextScene: "find_radio"
            }
        ]
    },

    // ========== PHẦN 3: THÀNH PHỐ HOANG TÀN ==========
    {
        id: "city_ruins",
        text: "Thành phố như một nghĩa địa khổng lồ. Những toà cao ốc chọc trời giờ đây chỉ còn là đống đổ nát. Bạn nghe thấy tiếng kêu lạ từ xa - không phải tiếng người. Trên đường phố, bạn thấy một nhóm người vũ trang đang lục soát xác chết.",
        choices: [
            {
                text: "Tiếp cận nhóm người một cách thận trọng",
                nextScene: "raiders"
            },
            {
                text: "Lẻn qua và tránh mặt họ",
                nextScene: "sneak_past"
            },
            {
                text: "Quan sát từ xa",
                nextScene: "observe_raiders"
            }
        ]
    },
    {
        id: "raiders",
        text: "Khi họ phát hiện bạn, một người đàn bà đầu trọc với khẩu súng săn bước tới:\n\n\"Đưa hết đồ ra! Nhanh lên!\"\n\nNhóm người vây quanh bạn. Họ trông hung hãn và tuyệt vọng.",
        choices: [
            {
                text: "Chiến đấu (cần Xà beng)",
                nextScene: "fight_raiders",
                requiredItem: "Xà beng"
            },
            {
                text: "Đưa hết đồ cho họ",
                nextScene: "lose_items"
            },
            {
                text: "Cố gắng đàm phán",
                nextScene: "negotiate_raiders"
            }
        ]
    },
    {
        id: "fight_raiders",
        text: "Bạn vung xà beng và đánh ngã người đàn bà. Những người khác lao tới nhưng bạn chiến đấu dữ dội. Sau một hồi giằng co, họ bỏ chạy. Bạn bị thương khá nặng. Mất 40 HP.",
        hpCost: 40,
        choices: [
            {
                text: "Nghỉ ngơi và băng bó vết thương",
                nextScene: "after_fight"
            }
        ]
    },
    {
        id: "sneak_past",
        text: "Bạn lẻn qua những con hẻm tối, tránh xa nhóm người vũ trang. Di chuyển trong bóng tối, bạn thấy một toà nhà trông còn nguyên vẹn hơn - có vẻ là bệnh viện cũ.",
        choices: [
            {
                text: "Vào bệnh viện tìm vật dụng y tế",
                nextScene: "hospital"
            },
            {
                text: "Tiếp tục đi sâu vào thành phố",
                nextScene: "deep_city"
            }
        ]
    },
    {
        id: "observe_raiders",
        text: "Bạn quan sát từ xa. Họ lục soát có vẻ tuyệt vọng - tìm thức ăn, nước, thuốc. Có lẽ họ cũng chỉ là những người cố gắng sống sót như bạn. Một người trong nhóm ho khan khan, trông rất yếu.",
        choices: [
            {
                text: "Tiếp cận và cố gắng giúp đỡ",
                nextScene: "help_raiders"
            },
            {
                text: "Rời khỏi đây, không can thiệp",
                nextScene: "sneak_past"
            }
        ]
    },
    {
        id: "negotiate_raiders",
        text: "Bạn giơ tay lên: \"Đợi đã! Tôi có thể giúp các người. Tôi biết nơi còn đồ ăn và thuốc men.\"\n\nNgười đàn bà ngập ngừng, sau đó hạ súng: \"Nói đi. Nếu mày nói dối, mày chết.\"",
        choices: [
            {
                text: "Dẫn họ đến cửa hàng tạp hoá đã qua",
                nextScene: "help_raiders"
            },
            {
                text: "Nói dối và tìm cách chạy thoát",
                nextScene: "lie_to_raiders"
            }
        ]
    },
    {
        id: "help_raiders",
        text: "Bạn dẫn họ đến nơi trú ẩn bạn tìm được trước đó và chia sẻ vật dụng. Họ ngạc nhiên và biết ơn. Người đàn bà tên là Lan, cô nói:\n\n\"Cảm ơn... Tao xin lỗi vì đã đe doạ mày. Nếu mày muốn, đi cùng nhóm tao. Chúng ta mạnh hơn khi ở cùng nhau.\"\n\nHP hồi phục +20.",
        hpCost: -20,
        choices: [
            {
                text: "Gia nhập nhóm của Lan",
                nextScene: "join_group"
            },
            {
                text: "Cảm ơn nhưng vẫn đi một mình",
                nextScene: "solo_journey"
            }
        ]
    },
    {
        id: "join_group",
        text: "Bạn gia nhập nhóm của Lan. Họ gồm 5 người: Lan (thủ lĩnh), Tuấn (bác sĩ), Hoa (kỹ sư), và hai anh em sinh đôi Đức & Dũng (lính cũ). Cùng nhau, các bạn xây dựng một căn cứ nhỏ trong toà nhà. Ngày qua ngày, cộng đồng nhỏ dần lớn mạnh. Bạn đã tìm được gia đình mới trong thế giới tận thế này.",
        choices: [
            {
                text: "Kết thúc hành trình",
                nextScene: "good_ending"
            }
        ]
    },
    {
        id: "solo_journey",
        text: "Bạn quyết định tiếp tục một mình. Hành trình vẫn còn dài. Bạn vẫy tay chào tạm biệt và bước vào bóng đêm...",
        choices: [
            {
                text: "Tiếp tục khám phá thế giới",
                nextScene: "deep_city"
            }
        ]
    },
    {
        id: "lose_items",
        text: "Bạn đưa hết đồ cho họ. Họ lục lọi rồi đẩy bạn넘어. Bạn ngã xuống đất, bầm tím khắp người. Mất 20 HP. Khi họ đi rồi, bạn chỉ còn lại chính mình và nỗi tuyệt vọng.",
        hpCost: 20,
        choices: [
            {
                text: "Đứng dậy và tiếp tục",
                nextScene: "after_robbed"
            }
        ]
    },
    {
        id: "lie_to_raiders",
        text: "Bạn dẫn họ đi sai hướng rồi nhân lúc họ không để ý, chạy thoát. Tiếng súng nổ đằng sau - một viên đạn sượt qua tai bạn. Mất 15 HP. Nhưng bạn thoát được!",
        hpCost: 15,
        choices: [
            {
                text: "Chạy về phía bệnh viện",
                nextScene: "hospital"
            }
        ]
    },

    // ========== PHẦN 4: CÁC ENDING ==========
    {
        id: "hospital",
        text: "Bệnh viện hoang tàn, tối om. Bạn tìm được phòng dự trữ thuốc men vẫn còn nguyên vẹn. Bên trong có đủ loại thuốc, băng gạc, và thậm chí cả máy phát điện nhỏ còn hoạt động.\n\nBỗng nhiên, bạn nghe thấy tiếng... radio? Có người đang phát tín hiệu cầu cứu từ tầng trên!",
        choices: [
            {
                text: "Lên tầng trên tìm nguồn tín hiệu",
                nextScene: "secret_ending"
            },
            {
                text: "Lấy thuốc rồi rời đi, quá nguy hiểm",
                nextScene: "take_medicine"
            }
        ]
    },
    {
        id: "find_radio",
        text: "Trong quá trình lục lọi, bạn tìm được một chiếc radio quân đội còn pin. Bật lên, bạn nghe thấy tín hiệu mờ ảo:\n\n'...còn ai sống... tới khu B... chúng tôi có vaccine... còn hy vọng...'\n\nBạn đã tìm thấy manh mối về những người còn sống sót!",
        choices: [
            {
                text: "Đi theo tín hiệu radio",
                nextScene: "secret_ending"
            },
            {
                text: "Bỏ qua, quá nguy hiểm",
                nextScene: "city_ruins"
            }
        ]
    },
    {
        id: "secret_ending",
        text: "Bạn đi theo tín hiệu và tìm thấy một căn cứ quân sự bí mật còn hoạt động. Đội cứu hộ đón bạn vào. Họ đang phát triển vaccine để chữa khỏi virus. Nhờ vào kiến thức và đồ dụng bạn mang về, họ hoàn thiện công thức.\n\nMột năm sau, vaccine được phân phối rộng rãi. Thế giới bắt đầu hồi phục. Bạn đã không chỉ sống sót - bạn đã cứu nhân loại.\n\n✨ PHÁT HIỆN KẾT THÚC BÍ MẬT! ✨",
        choices: [
            {
                text: "🔄 Chơi lại",
                nextScene: "start"
            }
        ]
    },
    {
        id: "good_ending",
        text: "Sáu tháng sau...\n\nCăn cứ của nhóm bạn giờ đã có 30 người. Các bạn trồng rau, lọc nước, phát điện bằng mặt trời. Trẻ em cười đùa trong sân. Cuộc sống tuy khó khăn nhưng đầy hy vọng.\n\nMột đêm, ngồi bên lửa trại, Lan nói với bạn: \"Cảm ơn mày. Nếu không có mày ngày hôm đó, tao và mọi người đã không còn đây.\"\n\nBạn mỉm cười. Trong thế giới tận thế, bạn đã tìm thấy điều quý giá nhất - CON NGƯỜI.\n\n🌟 KẾT THÚC TỐT - BẠN ĐÃ CHIẾN THẮNG! 🌟",
        choices: [
            {
                text: "🔄 Chơi lại",
                nextScene: "start"
            }
        ]
    },
    {
        id: "bad_ending",
        text: "Bạn không thể chống cự. Họ áp đảo bạn. Trong bóng tối, bạn nghe thấy Minh nói:\n\n\"Xin lỗi... nhưng trong thế giới này, chỉ có kẻ mạnh mới sống sót...\"\n\nĐó là điều cuối cùng bạn nghe thấy.\n\n💀 KẾT THÚC XẤU - BẠN ĐÃ THẤT BẠI 💀\n\nTrong thế giới tận thế, lòng tin mù quáng có thể khiến bạn mất mạng.",
        choices: [
            {
                text: "🔄 Chơi lại",
                nextScene: "start"
            }
        ]
    },
    {
        id: "after_fight",
        text: "Bạn băng bó vết thương bằng vải rách. Cơ thể đau nhức nhưng bạn vẫn sống. Bạn lục lọi xác của những kẻ cướp và tìm được bản đồ vẽ tay - có đánh dấu 'KHU AN TOÀN'.",
        choices: [
            {
                text: "Đi theo bản đồ",
                nextScene: "safe_zone"
            },
            {
                text: "Bỏ qua, tự tìm đường",
                nextScene: "deep_city"
            }
        ]
    },
    {
        id: "after_robbed",
        text: "Không còn gì cả, bạn chỉ còn ý chí sống sót. Đêm xuống, lạnh giá. Bạn phải tìm nơi trú ẩn ngay...",
        choices: [
            {
                text: "Vào toà nhà gần nhất",
                nextScene: "random_building"
            }
        ]
    },
    {
        id: "random_building",
        text: "Toà nhà hóa ra là kho hàng cũ. Bạn tìm được chăn ấm và vài hộp đồ hộp chưa hỏng. HP hồi phục +10. Có lẽ vận may chưa rời bỏ bạn hoàn toàn.",
        hpCost: -10,
        choices: [
            {
                text: "Nghỉ ngơi qua đêm",
                nextScene: "new_day"
            }
        ]
    },
    {
        id: "new_day",
        text: "Ngày mới đến. Bạn cảm thấy mạnh mẽ hơn. Hành trình vẫn tiếp tục...",
        choices: [
            {
                text: "Tiếp tục khám phá",
                nextScene: "deep_city"
            }
        ]
    },
    {
        id: "deep_city",
        text: "Bạn đi sâu vào trung tâm thành phố. Ở đây hoang tàn hơn, nguy hiểm hơn, nhưng cũng có thể ẩn chứa nhiều tài nguyên hơn. Bạn thấy một tấm biển: 'KHU AN TOÀN - 2KM ▶'",
        choices: [
            {
                text: "Đi theo hướng chỉ dẫn",
                nextScene: "safe_zone"
            },
            {
                text: "Khám phá trung tâm thành phố",
                nextScene: "city_center"
            }
        ]
    },
    {
        id: "safe_zone",
        text: "Sau 2km đi bộ, bạn tới một khu vực được rào chắn bằng container. Lính canh phát hiện và hỏi han. Sau khi kiểm tra, họ cho bạn vào.\n\nBên trong là một cộng đồng 50+ người, có điện, nước sạch, và hy vọng. Bạn đã tìm được nơi an toàn cuối cùng.\n\n🌟 KẾT THÚC TỐT - NƠI TRÚ ẨN AN TOÀN 🌟",
        choices: [
            {
                text: "🔄 Chơi lại",
                nextScene: "start"
            }
        ]
    },
    {
        id: "city_center",
        text: "Trung tâm thành phố nguy hiểm hơn bạn nghĩ. Bạn nghe thấy tiếng gầm gừ kỳ lạ - không phải người. Một sinh vật biến dị cao gần 3m, da thịt mục nát, bước ra từ bóng tối...\n\nBạn chạy hết sức nhưng nó quá nhanh. Mất 60 HP.",
        hpCost: 60,
        choices: [
            {
                text: "Cố gắng thoát thân",
                nextScene: "escape_monster"
            }
        ]
    },
    {
        id: "escape_monster",
        text: "Bạn lao vào một toà nhà và leo lên tầng cao. Con quái vật không thể leo theo. Bạn sống sót nhưng bị thương nặng. Nếu không có thuốc, bạn sẽ không qua khỏi...",
        choices: [
            {
                text: "Tìm thuốc men gần đây",
                nextScene: "hospital"
            },
            {
                text: "Cố gắng chịu đựng",
                nextScene: "struggle_alone"
            }
        ]
    },
    {
        id: "struggle_alone",
        text: "Bạn cố gắng băng bó vết thương nhưng nhiễm trùng lan nhanh. Sốt cao, mê sảng. Vài ngày sau, bạn không còn sức lực để tiếp tục...\n\n💀 KẾT THÚC XẤU - BẠN ĐÃ CHẾT VÌ NHIỄM TRÙNG 💀",
        choices: [
            {
                text: "🔄 Chơi lại",
                nextScene: "start"
            }
        ]
    },
    {
        id: "take_medicine",
        text: "Bạn lấy thuốc men và băng bó vết thương. HP hồi phục +40. Cảm thấy khỏe hơn nhiều, bạn quyết định tiếp tục hành trình.",
        hpCost: -40,
        choices: [
            {
                text: "Rời bệnh viện",
                nextScene: "deep_city"
            }
        ]
    }
];
