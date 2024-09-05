import {
  Accessor,
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  Resource,
  Switch,
} from "solid-js";
import { SupportCase, SupportCaseAPI } from "./api";

export function App() {
  return (
    <Switch>
      <Match when={location.href.endsWith("?requester")}>
        <RequesterPage />
      </Match>
      <Match when={location.href.endsWith("?reviewer")}>
        <ReviewerPage />
      </Match>
      <Match when={true}>
        <IndexPage />
      </Match>
    </Switch>
  );
}

function IndexPage() {
  return (
    <>
      <ul>
        <li>
          <a href="/?requester">Requester</a>
        </li>
        <li>
          <a href="/?reviewer">Reviewer</a>
        </li>
      </ul>
    </>
  );
}

function RequesterPage() {
  const api = new SupportCaseAPI();
  const [token, updateToken] = createStoredToken("requester-token", (token) =>
    api.setToken(token)
  );

  const [supportCases, { refetch }] = createResource(
    () => token(),
    () => api.listMySupportCases()
  );

  const credentialsModal = (() => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [open, setOpen] = createSignal(false);

    return {
      api,
      username,
      setUsername,
      password,
      setPassword,
      open,
      setOpen,
    };
  })();

  const onCredentialsClick = async (supportCase: SupportCase) => {
    const creds = await api.getSupportCaseCredentials(supportCase.id);
    credentialsModal.setUsername(creds.username);
    credentialsModal.setPassword(creds.password);
    credentialsModal.setOpen(true);
  };

  return (
    <>
      <div class="container">
        <h1>Support Access (Requester)</h1>
        <div>
          <button
            class="margin-bottom"
            onClick={() => {
              const newToken = prompt("Provide token");
              if (newToken) {
                updateToken(newToken);
                refetch();
              }
            }}
          >
            Login
          </button>
          <label class="paper-btn margin-left" for="createSupportAccessModal">
            Create Support Case
          </label>
          <SupportCaseList
            {...{
              api,
              supportCases,
              refetch,
              admin: false,
              onCredentialsClick,
            }}
          />
        </div>
      </div>

      <CreateSupportCaseModal
        onInput={async ({ tenantId, title }) => {
          await api.createSupportCase({
            tenantId,
            title,
            description: title,
            accessLevel: "read-only",
            assignees: [api.getAuthContext().requester],
          });
          await refetch();

          return true;
        }}
      />

      <CredentialsModal {...credentialsModal} />
    </>
  );
}

function ReviewerPage() {
  const api = new SupportCaseAPI();
  const [token, updateToken] = createStoredToken("reviewer-token", (token) =>
    api.setToken(token)
  );

  const [supportCases, { refetch }] = createResource(
    () => token(),
    () => api.listAllSupportCases()
  );

  return (
    <>
      <div class="container">
        <h1>Support Access (Reviewer)</h1>
        <div>
          <button
            class="margin-bottom"
            onClick={() => {
              const newToken = prompt("Provide token");
              if (newToken) {
                updateToken(newToken);
                refetch();
              }
            }}
          >
            Login
          </button>
          <br />
          <SupportCaseList {...{ api, supportCases, refetch, admin: true }} />
        </div>
      </div>
    </>
  );
}

function createStoredToken(name: string, onChange: (token: string) => void) {
  const [token, setToken] = createSignal(null as string | null);

  const updateToken = (newToken: string) => {
    if (newToken) {
      setToken(newToken);
      onChange(newToken);
      localStorage.setItem(name, newToken);
    }
  };

  createEffect(() => {
    const storedToken = localStorage.getItem(name);
    if (storedToken) {
      updateToken(storedToken);
    }
  });

  return [token, updateToken] as const;
}

type SupportCaseListProps = {
  api: SupportCaseAPI;
  supportCases: Resource<SupportCase[]>;
  refetch: () => unknown;
  onCredentialsClick?: (supportCase: SupportCase) => void;
  admin: boolean;
};

function SupportCaseList({
  api,
  supportCases,
  refetch,
  admin,
  onCredentialsClick,
}: SupportCaseListProps) {
  return (
    <div>
      <For each={supportCases()}>
        {(supportCase) => {
          const borderClass = {
            Pending: "border-secondary",
            Accepted: "border-success",
            Rejected: "border-danger",
            Expired: "border-primary",
            Archived: "border-primary",
            Closed: "border-primary",
          }[supportCase.status];

          return (
            <div class={`card margin border border-thick`}>
              <div class={`card-body border border-thick ${borderClass}`}>
                <h4 class="card-title">
                  #{supportCase.id} {supportCase.title} ({supportCase.status})
                </h4>
                <h5 class="card-subtitle">
                  {supportCase.createdAt.split("T")[0]}
                </h5>
                <Switch>
                  <Match when={!admin}>
                    <p class="card-text bold">
                      Tenant ID: {supportCase.tenantId}
                    </p>
                  </Match>
                </Switch>
                <p class="card-text">{supportCase.description}</p>
                <Switch>
                  <Match when={!admin}>
                    <label
                      for="credentialsModal"
                      class={
                        supportCase.status === "Accepted"
                          ? "paper-btn btn-secondary"
                          : "paper-btn btn-secondary disabled"
                      }
                      onClick={() => {
                        if (supportCase.status !== "Accepted") return;
                        onCredentialsClick?.(supportCase);
                      }}
                    >
                      Get Credentials
                    </label>
                  </Match>
                  <Match when={admin}>
                    <button
                      class="margin-left btn-success"
                      disabled={supportCase.status !== "Pending"}
                      onClick={async () => {
                        await api.acceptSupportCase(supportCase.id);
                        await refetch();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      class="margin-left btn-danger"
                      disabled={supportCase.status !== "Pending"}
                      onClick={async () => {
                        await api.rejectSupportCase(supportCase.id);
                        await refetch();
                      }}
                    >
                      Reject
                    </button>
                  </Match>
                </Switch>
                <button
                  class="margin-left btn-danger-outline"
                  disabled={supportCase.status !== "Pending"}
                  onClick={async () => {
                    await api.closeSupportCase(supportCase.id);
                    await refetch();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
}

function CreateSupportCaseModal(props: {
  onInput: (props: { tenantId: string; title: string }) => Promise<boolean>;
}) {
  let dialogState!: HTMLInputElement;
  const [tenantIdInput, setTenantIdInput] = createSignal(
    "CIR7nQwtS0rA6t0S6ejd"
  );
  const [titleInput, setTitleInput] = createSignal("");

  return (
    <>
      <input
        class="modal-state"
        id="createSupportAccessModal"
        type="checkbox"
        ref={dialogState}
      />
      <div class="modal">
        <label class="modal-bg" for="createSupportAccessModal"></label>
        <div class="modal-body border">
          <h4 class="modal-title">
            Create Support Case &nbsp;&nbsp;&nbsp;&nbsp;
          </h4>
          <label class="btn-close" for="createSupportAccessModal">
            X
          </label>
          <div class="form-group">
            <label for="tenantId">Tenant ID</label>
            <input
              id="tenantId"
              type="text"
              placeholder=". . ."
              value={tenantIdInput()}
              onInput={(e) => setTenantIdInput(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder=". . ."
              value={titleInput()}
              onInput={(e) => setTitleInput(e.target.value)}
            />
          </div>
          <button
            class="btn-secondary"
            onClick={async () => {
              const shouldClose = await props.onInput({
                tenantId: tenantIdInput(),
                title: titleInput(),
              });
              if (!shouldClose) {
                return;
              }

              dialogState.checked = false;
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

function CredentialsModal(props: {
  api: SupportCaseAPI;
  username: Accessor<string>;
  password: Accessor<string>;
}) {
  return (
    <>
      <input class="modal-state" id="credentialsModal" type="checkbox" />
      <div class="modal">
        <label class="modal-bg" for="credentialsModal"></label>
        <div class="modal-body border">
          <h4 class="modal-title">Credentials &nbsp;&nbsp;&nbsp;&nbsp;</h4>
          <label class="btn-close" for="credentialsModal">
            X
          </label>
          <button
            onClick={() => navigator.clipboard.writeText(props.username())}
          >
            Copy username
          </button>
          <button
            class="margin-left"
            onClick={() => navigator.clipboard.writeText(props.password())}
          >
            Copy password
          </button>
        </div>
      </div>
    </>
  );
}
