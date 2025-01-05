import studywith from "../../assets/imgs/studywith.png";
import vinteum from "../../assets/imgs/vinteum.png";
import exercheck from "../../assets/imgs/exercheck.png";

const projects = [
    {
        title: "StudyWith (스윗)",
        period: "2024.12 - 2024.12 (웹앱 배포)",
        tags: [
            "Flutter",
            "Firebase",
            "Figma",
            "Git",
            "Github Actions",
            "google_maps_flutter_web",
            "Firebase Cloud Functions",
            "cloud_firestore",
            "firebase_auth",
        ],
        description:
            "StudyWith 프로젝트는 교내 학습 라운지의 위치를 지도에 시각화하여 제공하고 간편하게 개인의 이용을 관리할 수 있는 플랫폼입니다. 기획부터 디자인, 개발까지 모두 진행한 개인 프로젝트로 Github Actions로 배포한 서비스 입니다.",
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
        period: "2024.07 - 현재",
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
            "빈틈 프로젝트는 사용자의 시간표 사진을 인공지능으로 분석하고 그룹별로 공강 시간이 겹치는 시간을 계산하여 대학생들이 보다 간편하게 시간 관리를 할 수 있도록 돕는 대학생 대상의 모바일 어플리케이션입니다.\n" +
            "프로젝트의 기획 단계부터 참여하였으며 메인 프론트엔드 개발자로 참여했습니다.",
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
            "shared_preferences",
            "cloud_firestore",
            "firebase_auth",
            "Firebase Hosting",
            "Git",
        ],
        description:
            "사용자의 운동을 쉽게 기록하고 관리 할 수 있는 것을 목표로 주변의 수요를 통해 개발을 시작하였습니다.\n" +
            "다양한 데이터를 시각화 하여 사용자에게 동기부여를 제공하는 것이 목표이며 주변 지인들에게 배포하여 사용이 이루어지고 있습니다." +
            "현재 구글 플레이 스토어 프로덕션 과정을 진행 중에 있습니다.",
        image: exercheck, // import로 불러온 이미지 사용
        details: [
        ],
    },
];

export default projects;