import studywith from "../../assets/imgs/studywith.png";
import vinteum from "../../assets/imgs/vinteum.png";
import exercheck from "../../assets/imgs/exercheck.png";

const projects = [
    {
        title: "StudyWith (스윗)",
        period: "2024.12 - 2024.12 (웹앱 배포)",
        tags: [
            "Flutter",
            "Flutter Web",
            "Firebase",
            "Figma",
            "Git",
            "Github Actions",
            "Firebase Cloud Functions",
            "cloud_firestore",
            "firebase_auth",
        ],
        description:
           "StudyWith 프로젝트는 교내 학습 라운지의 위치를 지도에 시각적으로 제공하며, 개인 이용 관리 기능을 간편하게 지원하는 플랫폼입니다. 기획부터 디자인, 개발까지 전 과정을 혼자 수행한 개인 프로젝트로 Github Actions를 활용한 CI/CD 구축을 통해 배포한 서비스입니다.",
        image: studywith,
        details: [
            "Firebase를 활용한 자체 데이터베이스 구축",
            "서버리스 프레임워크 Firebase Cloud Functions로 라운지 이용 자동 종료 구축",
            "firebase_auth를 활용한 사용자 정보 관리",
            "google_maps_flutter_web을 활용한 지도 서비스 제공",
            "Github Actions를 활용한 CI/CD 구축",
        ],
    },
    {
        title: "빈틈",
        period: "2024.07 - 현재 (IOS 배포)",
        tags: [
            "Flutter",
            "Provider",
            "RestAPI",
            "http",
            "Git",
            "Github",
            "Figma",
        ],
        description:
            "빈틈 프로젝트는 사용자의 시간표 사진을 인공지능으로 분석해 그룹별 공강 시간을 계산함으로써 대학생들이 효율적으로 모임 일정 관리를 할 수 있도록 돕는 모바일 애플리케이션입니다. 기획 단계부터 참여했으며, 애플리케이션의 핵심 로직을 설계 및 구현하는 메인 프론트엔드 개발자로 참여했습니다.",
        image: vinteum, // import로 불러온 이미지 사용
        details: [
            "Provider를 사용하여 기본 상태 관리 구조의 한계 극복",
            "shared_preferences 기반 로컬 저장소 활용으로 보안성 강화",
            "RestAPI를 통해 구축된 서버와의 통신을 위한 코드를 구축",
            "서버와의 송수신 데이터를 가공하여 앱 내에서 사용 가능한 형태로 변환",
            "Figma를 활용하여 디자이너와 협업을 위한 와이어프레임 제작",
        ],
    },
    {
        title: "ExerCheck",
        period: "2024.09 - 2024.10",
        tags: [
            "Flutter",
            "Provider",
            "flutter_local_notifications",
            "cloud_firestore",
            "firebase_auth",
            "Firebase Hosting",
            "Git",
        ],
        description:
           "ExerCheck 프로젝트는 사용자가 운동을 쉽고 효율적으로 기록하고 관리할 수 있도록 도움을 주는 모바일 어플리케이션 입니다. 다양한 데이터를 제공해 사용자에게 동기부여를 제공하는 것을 목표로 하며 주변의 수요를 반영해 기획, 디자인, 개발까지 모두 직접 진행한 개인 프로젝트입니다.",
        image: exercheck, // import로 불러온 이미지 사용
        details: [
        ],
    },
];

export default projects;