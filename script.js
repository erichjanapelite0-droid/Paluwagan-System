// ========================================
// PALUWAGAN DATA
// ========================================

let paluwaganList = [

    {
        id: 1,
        amount: 10000,
        months: 6,
        monthly: 2000,
        startDate: "",
        members: []
    },

    {
        id: 2,
        amount: 10000,
        months: 5,
        monthly: 2000,
        startDate: "",
        members: []
    },

    {
        id: 3,
        amount: 25000,
        months: 6,
        monthly: 5000,
        startDate: "",
        members: []
    }

];


let selectedBatchId = null;

let editingMemberIndex = null;


// ========================================
// DISPLAY PALUWAGAN
// ========================================

function displayPaluwagan() {

    const container =
        document.getElementById("paluwaganContainer");

    container.innerHTML = "";


    paluwaganList.forEach(batch => {

        const card = document.createElement("div");

        card.className = "paluwagan-card";


        card.innerHTML = `

            <div class="amount">
                ₱${batch.amount.toLocaleString()}
            </div>

            <div class="months">
                ${batch.months} Months
            </div>

            <div class="monthly">
                ₱${batch.monthly.toLocaleString()}
                / month
            </div>

            <div class="member-count">

                👥
                ${batch.members.length}
                Member(s)

            </div>


            <button
                class="open-button"
                onclick="openBatch(${batch.id})">

                Open Paluwagan

            </button>

        `;


        container.appendChild(card);

    });

}


// ========================================
// OPEN ADD BATCH MODAL
// ========================================

function openAddBatchModal() {

    document.getElementById("batchModal")
        .style.display = "flex";

}


// ========================================
// CLOSE ADD BATCH MODAL
// ========================================

function closeBatchModal() {

    document.getElementById("batchModal")
        .style.display = "none";

}


// ========================================
// SAVE PALUWAGAN
// ========================================

function saveBatch() {

    const amount =
        Number(
            document.getElementById("batchAmount").value
        );


    const months =
        Number(
            document.getElementById("batchMonths").value
        );


    const monthly =
        Number(
            document.getElementById("batchMonthly").value
        );


    const startDate =
        document.getElementById("batchStartDate").value;


    if (
        !amount ||
        !months ||
        !monthly
    ) {

        alert("Please complete all required fields.");

        return;

    }


    const newBatch = {

        id: Date.now(),

        amount: amount,

        months: months,

        monthly: monthly,

        startDate: startDate,

        members: []

    };


    paluwaganList.push(newBatch);


    displayPaluwagan();

    closeBatchModal();


    document.getElementById("batchAmount").value = "";

    document.getElementById("batchMonths").value = "";

    document.getElementById("batchMonthly").value = "";

    document.getElementById("batchStartDate").value = "";

}


// ========================================
// OPEN PALUWAGAN
// ========================================

function openBatch(batchId) {

    selectedBatchId = batchId;


    const batch =
        paluwaganList.find(
            item => item.id === batchId
        );


    if (!batch) {

        return;

    }


    document.getElementById(
        "selectedBatchTitle"
    ).textContent =

        `₱${batch.amount.toLocaleString()} Paluwagan`;


    document.getElementById(
        "selectedBatchDetails"
    ).textContent =

        `${batch.months} Months • ₱${batch.monthly.toLocaleString()} Monthly`;


    document.getElementById(
        "membersPage"
    ).style.display = "block";


    displayMembers();

}


// ========================================
// CLOSE MEMBERS PAGE
// ========================================

function closeMembersPage() {

    document.getElementById(
        "membersPage"
    ).style.display = "none";


    selectedBatchId = null;

}


// ========================================
// DISPLAY MEMBERS
// ========================================

function displayMembers() {

    const batch =
        paluwaganList.find(
            item => item.id === selectedBatchId
        );


    if (!batch) {

        return;

    }


    const list =
        document.getElementById("memberList");


    // NO MEMBERS

    if (batch.members.length === 0) {

        list.innerHTML = `

            <div style="
                padding:40px;
                text-align:center;
                color:#777;
            ">

                No members added yet.

            </div>

        `;

        return;

    }


    // TABLE HEADER

    list.innerHTML = `

        <div class="member-row"
             style="
                font-weight:bold;
                background:#f8fafc;
             ">

            <div>
                Member Name
            </div>

            <div>
                Payment
            </div>

            <div>
                Payment Date
            </div>

            <div>
                Status
            </div>

            <div>
                Action
            </div>

        </div>

    `;


    // DISPLAY MEMBERS

    batch.members.forEach(
        (member, index) => {


        const row =
            document.createElement("div");


        row.className = "member-row";


        // FORMAT PAYMENT

        const formattedPayment =
            member.payment
                ? `₱${Number(member.payment).toLocaleString()}`
                : "₱0";


        // FORMAT DATE

        const formattedDate =
            member.date
                ? formatDate(member.date)
                : "No date";


        // STATUS STYLE

        const statusClass =
            member.status === "Done"
                ? "status-done"
                : "status-pending";


        row.innerHTML = `

            <div class="member-name">

                ${member.name}

            </div>


            <div class="member-payment">

                ${formattedPayment}

            </div>


            <div class="member-date">

                ${formattedDate}

            </div>


            <div>

                <span class="${statusClass}">

                    ${member.status}

                </span>

            </div>


            <div class="action-buttons">

                <button
                    class="edit-button"
                    onclick="editMember(${index})">

                    Edit

                </button>


                <button
                    class="delete-button"
                    onclick="deleteMember(${index})">

                    Delete

                </button>

            </div>

        `;


        list.appendChild(row);

    });

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


// ========================================
// OPEN ADD MEMBER
// ========================================

function openAddMemberModal() {

    editingMemberIndex = null;


    document.getElementById(
        "memberModalTitle"
    ).textContent = "Add Member";


    document.getElementById(
        "memberName"
    ).value = "";


    // CLEAR PAYMENT AMOUNT

    document.getElementById(
        "paymentAmount"
    ).value = "";


    document.getElementById(
        "paymentDate"
    ).value = "";


    document.getElementById(
        "paymentStatus"
    ).value = "Pending";


    document.getElementById(
        "memberModal"
    ).style.display = "flex";

}


// ========================================
// CLOSE MEMBER MODAL
// ========================================

function closeMemberModal() {

    document.getElementById(
        "memberModal"
    ).style.display = "none";

}


// ========================================
// SAVE MEMBER
// ========================================

function saveMember() {

    const name =
        document.getElementById(
            "memberName"
        ).value.trim();


    // GET PAYMENT AMOUNT

    const paymentAmount =
        Number(
            document.getElementById(
                "paymentAmount"
            ).value
        );


    const date =
        document.getElementById(
            "paymentDate"
        ).value;


    const status =
        document.getElementById(
            "paymentStatus"
        ).value;


    // VALIDATION

    if (!name || !paymentAmount) {

        alert(
            "Please enter the member name and payment amount."
        );

        return;

    }


    const batch =
        paluwaganList.find(
            item => item.id === selectedBatchId
        );


    if (!batch) {

        return;

    }


    // MEMBER DATA

    const member = {

        name: name,

        payment: paymentAmount,

        date: date,

        status: status

    };


    // ADD MEMBER

    if (editingMemberIndex === null) {

        batch.members.push(member);

    }


    // EDIT MEMBER

    else {

        batch.members[
            editingMemberIndex
        ] = member;

    }


    displayMembers();

    displayPaluwagan();

    closeMemberModal();

}


// ========================================
// EDIT MEMBER
// ========================================

function editMember(index) {

    const batch =
        paluwaganList.find(
            item => item.id === selectedBatchId
        );


    if (!batch) {

        return;

    }


    const member =
        batch.members[index];


    editingMemberIndex = index;


    document.getElementById(
        "memberModalTitle"
    ).textContent = "Edit Member";


    document.getElementById(
        "memberName"
    ).value = member.name;


    // SHOW EXISTING PAYMENT

    document.getElementById(
        "paymentAmount"
    ).value = member.payment || "";


    document.getElementById(
        "paymentDate"
    ).value = member.date;


    document.getElementById(
        "paymentStatus"
    ).value = member.status;


    document.getElementById(
        "memberModal"
    ).style.display = "flex";

}


// ========================================
// DELETE MEMBER
// ========================================

function deleteMember(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this member?"
        );


    if (!confirmDelete) {

        return;

    }


    const batch =
        paluwaganList.find(
            item => item.id === selectedBatchId
        );


    if (!batch) {

        return;

    }


    batch.members.splice(index, 1);


    displayMembers();

    displayPaluwagan();

}


// ========================================
// START SYSTEM
// ========================================

displayPaluwagan();